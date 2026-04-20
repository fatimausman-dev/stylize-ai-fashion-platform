import { prisma } from "@/database";
import { createEndpoint } from "@/commons";
import createError from "http-errors";
import {
  calculateMonthlyOrders,
  calculateProductsSold,
  calculateTotalEarnings,
  findBuyers,
  findTopSellers,
} from "./retail.service";

export const getInsights = createEndpoint({}, async (req, res) => {
  const { userId } = req;

  const shop = await prisma.shop.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!shop) {
    throw createError(404, "Shop not found");
  }

  const orders = await prisma.order.findMany({
    where: {
      ShopOrders: {
        some: {
          shopId: shop.id,
        },
      },
      paymentStatus: "COMPLETED",
    },
    select: {
      date: true,
      Buyer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      ShopOrders: {
        where: {
          shopId: shop.id,
          status: "COMPLETED",
        },
        select: {
          subTotal: true,
          OrderDetails: {
            select: {
              Product: {
                select: {
                  id: true,
                  name: true,
                }
              },
              quantity: true,
            },
          },
        },
      },
    },
  });

  const totalOrders = orders.length;
  const totalEarnings = calculateTotalEarnings(orders);
  const productsSold = calculateProductsSold(orders);
  const monthlyOrders = calculateMonthlyOrders(orders);  
  const buyers = findBuyers(orders); 

  // top sellers
  const topProducts = findTopSellers(orders);

  res.json({
    result: {
      orders: totalOrders,
      totalEarnings: totalEarnings,
      productsSold: productsSold,
      topProducts: topProducts,
      buyers: buyers,
      monthlyOrders: monthlyOrders,
    },
  });
});
