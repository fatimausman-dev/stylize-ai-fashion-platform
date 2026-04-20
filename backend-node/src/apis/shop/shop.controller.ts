import { createEndpoint } from "@/commons";
import { prisma } from "@/database";
import createError from "http-errors";

export const getShops = createEndpoint({}, async (req, res) => {
  const shops = await prisma.shop.findMany(
    {
      include: {
        Category: true,
        Product: true,
        Policy: true,
      },
    }
  );
  console.log(shops);
  res.json({
    result: shops,
  });
});

export const getShop = createEndpoint({}, async (req, res, next) => {
  const userID = req.userId;
  const shop = await prisma.shop.findUnique({
    where: {
      userId: userID,
    },
  });
  if (!shop) {
    throw new createError.NotFound("Shop not found");
  }
  if(shop) {
    const policy = await prisma.policy.findUnique({
      where: {
        shopId: shop.id,
      },
    });

    res.json({
      result: {shop, policy},
    });
  }
});

// export const getTotalProducts = createEndpoint({}, async (req, res, next) => {
//   const shops = await prisma.shop.findMany();
//   const totalProducts = await prisma.product.count({
//     select: {
      
//     },
//     where: {
//       shopId: {
//         in: shops.map((shop) => shop.id),
//       },
//     },
//   });

//   res.json({
//     result: totalProducts,
//   });
// })
