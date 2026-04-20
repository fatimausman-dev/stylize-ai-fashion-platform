import { createEndpoint } from "@/commons";
import { prisma } from "@/database";
import createError from "http-errors";
import { calculateTotal } from "./cart.service";

// export const getCart = createEndpoint({}, async (req, res) => {
//     const userId = req.userId;

//     const buyer = await prisma.buyer.findUnique({
//         where: {
//             userId: userId,
//         },
//     });

//     if (!buyer) {
//         throw createError(404, "Buyer not found");
//     }

//     // FIND CART and CART ITEMS
//     const cart = await prisma.cart.findUnique({
//         where: {
//             buyerId: buyer.id,
//         },
//         include: {
//             CartItems: true,
//         }
//     });

//     if (!cart) {
//         throw createError(404, "Cart not found")
//     }

//     // // FIND CART ITEMS
//     // cart.CartItems = await prisma.cartItem.findMany({
//     //     where: {
//     //         cartId: cart.id,
//     //     },
//     //     // include: {
//     //     //     Product: true,
//     //     // },
//     // })

//     // FIND PRODUCT ASSOCIATED WITH CART ITEMS
//     cart.CartItems.map((item) => {
//         await prisma.product.findUnique({
//             where: {
//                 id: item.productId,
//             },
//             select: {
//                 name: true,
//                 images: true,
//             }
//         })
//     });

//     products.forEach((product) => {

//     res.json({
//         result: cart,
//     });
// });

export const getCart = createEndpoint({}, async (req, res) => {
  const userId = req.userId;

  // Fetch the buyer
  const buyer = await prisma.buyer.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!buyer) {
    throw createError(404, "Buyer not found");
  }

  // Fetch the cart and include CartItems
  const cart = await prisma.cart.findUnique({
    where: {
      buyerId: buyer.id,
    },
    include: {
      CartItems: {
        include: {
          Product: {
            select: {
              name: true,
              price: true,
              stock: true,
              images: true,
              Shop: {
                select: {
                  id: true,
                  name: true,
                  Policy: {
                    select: {
                      shippingFee: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!cart) {
    throw createError(404, "Cart not found");
  }

  // calculate total amounts 
  let totalShipping = 0;
  let subTotal = 0;
  let total = 100;

  // group cart items by shop
  const groupedCartItems = cart.CartItems.reduce((acc: { [key: string]: any[] }, item) => {
    const shop = item.Product.Shop.id;
    if (!acc[shop]) {
      acc[shop] = [];
    }
    acc[shop].push(item);
    return acc;
  }, {});

  // calculate subtotals and shipping fees
  for (const [shopId, items] of Object.entries(groupedCartItems)) {
    const shopPolicy = items[0].Product.Shop.Policy;
    const shippingFee = shopPolicy?.shippingFee || 0;
    const shopSubTotal = items.reduce((acc: any, item: { subTotal: number }) => acc + item.subTotal, 0);
    totalShipping += shippingFee;
    subTotal += shopSubTotal;
  }

  // calculate total
  total += subTotal + totalShipping;
  console.log(totalShipping, subTotal, total);
  res.json({
    result: {
      cart,
      totalShipping,
      subTotal,
      total,
    }
  });
});

export const addItem = createEndpoint({}, async (req, res) => {
  const userId = req.userId;
  const { productId, size, color, quantity } = req.body;

  let cart;

  const buyer = await prisma.buyer.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!buyer) {
    throw createError(404, "Buyer not found");
  }

  cart = await prisma.cart.findUnique({
    where: {
      buyerId: buyer.id,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        buyerId: buyer.id,
        quantity: 0,
        total: 0,
      },
    });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: productId,
      size: size,
      color: color,
    },
  });

  if (existingItem) {
    throw createError(409, "Item already in cart");
  }

  // find product price
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  let cartItem;
  if (product) {
   cartItem = await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId: productId,
      size: size,
      color: color,
      quantity: quantity,
      subTotal: product.price! * quantity,
    },
  });
  }

  // FIND CART ITEMS
  // const cartItems = await prisma.cartItem.findMany({
  //   where: {
  //     cartId: cart.id,
  //   },
  // });

  // CALCULATE TOTAL
  //let resultantTotal = calculateTotal(cartItems);

  // UPDATE CART
  // cart = await prisma.cart.update({
  //   where: {
  //     id: cart.id,
  //   },
  //   data: {
  //     total: resultantTotal.total,
  //     quantity: resultantTotal.totalQuantity,
  //   },
  // });

  res.json({
    result: cartItem,
  });
});

export const removeItem = createEndpoint({}, async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const buyer = await prisma.buyer.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!buyer) {
    throw createError(404, "Buyer not found");
  }

  let cart = await prisma.cart.findUnique({
    where: {
      buyerId: buyer.id,
    },
  });

  if (!cart) {
    throw createError(404, "Cart not found");
  }

  await prisma.cartItem.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.json({
    result: cart,
  });
});

export const delCart = createEndpoint({}, async (req, res) => {
  const userId = req.userId;

  const buyer = await prisma.buyer.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!buyer) {
    throw createError(404, "Buyer not found");
  }

  const cart = await prisma.cart.findUnique({
    where: {
      buyerId: buyer.id,
    },
  });

  if (!cart) {
    throw createError(404, "Cart not found");
  }

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  await prisma.cart.delete({
    where: {
      id: cart.id,
    },
  });

  res.json({
    result: "Cart deleted",
  });
});

export const updateItemQuantity = createEndpoint({}, async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { quantity } = req.body;

  const buyer = await prisma.buyer.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!buyer) {
    throw createError(404, "Buyer not found");
  }

  let cart = await prisma.cart.findUnique({
    where: {
      buyerId: buyer.id,
    },
  });

  if (!cart) {
    throw createError(404, "Cart not found");
  }

  let cartItem;
  cartItem = await prisma.cartItem.findFirst({
    where: {
      id: parseInt(id),
      cartId: cart.id,
    },
  });

  if (!cartItem) {
    throw createError(404, "Cart item not found");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: cartItem.productId,
    },
  });

  if (!product) {
    throw createError(404, "Product not found");
  }

  if (quantity > product.stock!) {
    throw createError(400, "Quantity exceeds stock");
  }

  cartItem = await prisma.cartItem.update({
    where: {
      id: parseInt(id),
      cartId: cart.id,
    },
    data: {
      quantity: quantity,
      subTotal: product.price! * quantity,
    },
  });

  res.json({
    result: cartItem,
  });
});

export const updateCart = createEndpoint({}, async (req, res) => {
  const userId = req.userId;

  const buyer = await prisma.buyer.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!buyer) {
    throw createError(404, "Buyer not found");
  }

  let cart = await prisma.cart.findUnique({
    where: {
      buyerId: buyer.id,
    },
  });

  if (!cart) {
    throw createError(404, "Cart not found");
  }

  // FIND CART ITEMS
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
  });

  // CALCULATE TOTAL
  let resultantTotal = calculateTotal(cartItems);

  // UPDATE CART
  cart = await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      total: resultantTotal.total,
      quantity: resultantTotal.totalQuantity,
    },
  });
});
