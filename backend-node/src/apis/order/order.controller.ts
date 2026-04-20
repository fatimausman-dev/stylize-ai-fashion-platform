import { createEndpoint } from "@/commons";
import { prisma } from "@/database";
import { processStripePayment } from "@/services/stripe";
import createError from "http-errors";
import { sendConfirmationEmail } from "./order.service";

// GET ALL ORDERS FROM BUYER
export const getBuyerOrders = createEndpoint({}, async (req, res) => {
  const { userId } = req;

  // Find the buyer based on userId
  const buyer = await prisma.buyer.findUnique({
    where: {
      userId: userId,
    },
  });

  // Throw error if buyer not found
  if (!buyer) {
    throw createError(404, "Buyer not found");
  }

  // Fetch completed orders
  const completedOrders = await prisma.order.findMany({
    where: {
      buyerId: buyer.id,
      deletedAtBuyer: null,
      paymentStatus: "COMPLETED",
    },
    select: {
      id: true,
      date: true,
    },
  });

  // Use Promise.all to wait for all shopOrder.findMany operations to complete
  const ordersWithDetails = await Promise.all(
    completedOrders.map(async (order) => {
      const shopOrders = await prisma.shopOrder.findMany({
        where: {
          orderId: order.id,
          deletedAtBuyer: null,
        },
        select: {
          id: true,
          status: true,
          subTotal: true,
          shippingFee: true,
          total: true,
          Shop: {
            select: {
              name: true,
            },
          },
          OrderDetails: {
            select: {
              quantity: true,
              size: true,
              color: true,
              subTotal: true,
              Product: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      });
      return {
        ...order, // Spread the order details
        shopOrders, // Include the fetched shopOrders
      };
    })
  );

  res.json({
    result: ordersWithDetails,
  });
});

// GET ALL ORDERS FROM SHOP
export const getOrders = createEndpoint({}, async (req, res) => {
  const { userId } = req;

  const shop = await prisma.shop.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!shop) {
    throw createError(404, "Shop not found");
  }

  // Fetch IDs of completed orders for the shop

  const completedOrderIds = await prisma.order
    .findMany({
      where: {
        paymentStatus: "COMPLETED",
        ShopOrders: {
          some: {
            shopId: shop.id,
            deletedAtRetail: null,
          },
        },
      },
      select: {
        id: true,
      },
    })
    .then((orders) => orders.map((order) => order.id));

  console.log("completedOrderIds", completedOrderIds);

  // Fetch ShopOrders with OrderDetails for found order IDs

  const completedShopOrders = await prisma.shopOrder.findMany({
    where: {
      orderId: {
        in: completedOrderIds,
      },
      deletedAtRetail: null,
      shopId: shop.id,
    },
    select: {
      id: true,
      status: true,
      subTotal: true,
      shippingFee: true,
      total: true,
      Order: {
        select: {
          date: true,
          paymentMethod: true,
          paymentStatus: true,
          Buyer: {
            select: {
              firstName: true,
              lastName: true,
              address: true,
              city: true,
              country: true,
              zip: true,
              user: {
                select: {
                  email: true,
                  phone: true,
                },
              },
            },
          },
        },
      },
      OrderDetails: {
        select: {
          quantity: true,
          size: true,
          color: true,
          subTotal: true,
          Product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true,
            },
          },
        },
      },
    },
  });
  console.log("completedShopOrders", completedShopOrders);
  res.json({
    result: completedShopOrders,
  });
});

// GET SINGLE ORDER FROM SHOP
export const getOrder = createEndpoint({}, async (req, res) => {
  const { id } = req.params;

  const order = await prisma.shopOrder.findUnique({
    where: {
      id,
    },
    include: {
      OrderDetails: {
        include: {
          Product: true,
        },
      },
    },
  });

  res.json({
    result: order,
  });
});

// CREATE ORDER
export const createOrder = createEndpoint({}, async (req, res) => {
  const userId = req.userId;
  const {
    firstName,
    lastName,
    address,
    city,
    country,
    zip,
    paymentMethod,
    orderId,
  } = req.body;

  const stripeId = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeCustomerId: true,
    },
  });

  const buyer = await prisma.buyer.update({
    where: {
      userId: userId,
    },
    data: {
      firstName,
      lastName,
      address,
      city,
      country,
      zip,
    },
  });

  const cart = await prisma.cart.findFirst({
    where: {
      buyerId: buyer.id,
    },
  });

  if (!cart) {
    throw createError(404, "Cart not found");
  }

  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      Product: {
        select: {
          shopId: true,
        },
      },
    },
  });

  const result = await prisma.$transaction(async (prisma) => {
    const groupedItems = cartItems.reduce(
      (acc: { [key: number]: any[] }, item) => {
        (acc[item.Product.shopId] = acc[item.Product.shopId] || []).push(item);
        return acc;
      },
      {}
    );

    let orderTotal = 100; // platform fee
    let overallSubTotal = 0;
    let overallShippingFee = 0;

    // Placeholder for shopOrder records to update the main order later
    const shopOrdersUpdates = [];

    for (const [shopId, items] of Object.entries(groupedItems)) {
      const shopPolicy = await prisma.policy.findUnique({
        where: { shopId: parseInt(shopId) },
      });
      const shippingFee = shopPolicy?.shippingFee || 0;

      let shopSubTotal = items.reduce(
        (acc: any, item: { subTotal: number }) => acc + item.subTotal,
        0
      );

      const shopTotal = shopSubTotal + shippingFee;
      overallSubTotal += shopSubTotal;
      overallShippingFee += shippingFee;

      // Record shopOrder data for later use
      shopOrdersUpdates.push({
        shopId: parseInt(shopId),
        items,
        shippingFee,
        shopSubTotal,
        shopTotal,
      });
    }

    orderTotal += overallSubTotal + overallShippingFee;

    let paymentDetails;
    if (paymentMethod == "card") {
      const stripeCustomerId = stripeId!.stripeCustomerId;
      const amount = orderTotal * 100; // Stripe requires amount in cents
      const currency = "pkr";
      const description = "Order payment";

      paymentDetails = await processStripePayment({
        stripeCustomerId,
        amount,
        currency,
        description,
      });

      if (stripeCustomerId == null) {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            stripeCustomerId: paymentDetails.customerId,
          },
        });
      }

      console.log("create order", paymentDetails);
    }
    console.log("create order 2.0", paymentDetails);

    const mainOrder = await prisma.order.upsert({
      where: {
        id: orderId,
      },
      update: {
        buyerId: buyer.id,
        date: new Date(),
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod == "cod" ? "COMPLETED" : "PENDING",
        subTotal: overallSubTotal,
        total: orderTotal,
      },
      create: {
        buyerId: buyer.id,
        date: new Date(),
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod == "cod" ? "COMPLETED" : "PENDING",
        subTotal: overallSubTotal,
        total: orderTotal,
      },
    });

    // create ShopOrders and OrderDetails for each shop
    if (orderId == 0) {
      for (const shopOrderData of shopOrdersUpdates) {
        const shopOrder = await prisma.shopOrder.create({
          data: {
            orderId: mainOrder.id,
            shopId: shopOrderData.shopId,
            status: "PENDING",
            subTotal: shopOrderData.shopSubTotal,
            shippingFee: shopOrderData.shippingFee,
            total: shopOrderData.shopTotal,
          },
        });

        // Create OrderDetails for each item in the shop order
        await Promise.all(
          shopOrderData.items.map(async (item) => {
            await prisma.orderDetail.create({
              data: {
                shopOrderId: shopOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                size: item.size || "",
                color: item.color || "",
                subTotal: item.subTotal,
              },
            });
          })
        );
      }
    }

    // update product stock
    if (paymentMethod == "cod") {
      for (const shopOrderData of shopOrdersUpdates) {
        for (const item of shopOrderData.items) {
          await prisma.product.update({
            where: {
              id: item.productId,
            },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
          console.log("stock updated");
        }
      }
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          email: true,
        },
      });
      console.log("email", user?.email);
      sendConfirmationEmail(user!.email);
      console.log("email sent");
    }
   
    return { mainOrder, paymentDetails };
  });

  res.json({ result: result });
});

// UPDATE PAYMENT STATUS
export const updatePaymentStatus = createEndpoint({}, async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { paymentStatus } = req.body;

  const order = await prisma.order.update({
    where: {
      id: parseInt(id),
    },
    data: {
      paymentStatus: paymentStatus,
    },
  });
  console.log("update payment status", paymentStatus);
  console.log("updated", order);

  // update stock
  if (paymentStatus == "COMPLETED") {
    const shopOrders = await prisma.shopOrder.findMany({
      where: {
        orderId: parseInt(id),
      },
      include: {
        OrderDetails: {
          select: {
            productId: true,
            quantity: true,
          },
        },
      },
    });

    for (const shopOrder of shopOrders) {
      for (const orderDetail of shopOrder.OrderDetails) {
        await prisma.product.update({
          where: {
            id: orderDetail.productId,
          },
          data: {
            stock: {
              decrement: orderDetail.quantity,
            },
          },
        });
      }
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
      },
    });
    sendConfirmationEmail(user!.email);
  }

  res.json({
    result: order,
  });
});

// UPDATE ORDER STATUS
export const updateStatus = createEndpoint({}, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log("server", id, "update status", status);

  const order = await prisma.shopOrder.update({
    where: {
      id: parseInt(id),
    },
    data: {
      status,
    },
  });

  console.log("server", order);

  res.json({
    result: order,
  });
});

// DELETE ORDER FROM SHOP
export const deleteOrder = createEndpoint({}, async (req, res) => {
  const { id } = req.params;
  console.log("delete order", id);

  await prisma.shopOrder.update({
    where: {
      deletedAtRetail: null,
      id: parseInt(id),
    },
    data: {
      deletedAtRetail: new Date(),
    },
  });

  res.json({
    result: "Order deleted",
  });
});

// DELETE ALL ORDERS FROM SHOP
export const deleteOrders = createEndpoint({}, async (req, res) => {
  const { userId } = req;

  const orders = await prisma.shopOrder.updateMany({
    where: {
      deletedAtRetail: null,
      Shop: {
        userId,
      },
    },
    data: {
      deletedAtRetail: new Date(),
    },
  });

  res.json({
    result: orders,
  });
});

// DELETE ORDER FROM BUYER'S ORDERS LOG
export const deleteBuyerOrder = createEndpoint({}, async (req, res) => {
  const { id } = req.params;
  await prisma.order.update({
    where: {
      id,
      deletedAtBuyer: null,
    },
    data: {
      deletedAtBuyer: new Date(),
    },
  });
  res.json({
    result: "Order deleted",
  });
});

// DELETE ALL ORDERS FROM BUYER'S ORDERS LOG
export const deleteBuyerOrders = createEndpoint({}, async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const buyer = await prisma.buyer.findFirst({
    where: { userId: userId },
  });

  if (!buyer) {
    throw createError(404, "Buyer not found");
  }

  const orders = await prisma.order.updateMany({
    where: {
      buyerId: buyer.id,
      deletedAtBuyer: null,
    },
    data: {
      deletedAtBuyer: new Date(),
    },
  });

  res.json({
    result: orders,
  });
});
