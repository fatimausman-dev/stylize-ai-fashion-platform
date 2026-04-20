import { createEndpoint } from "@/commons";
import { prisma } from "@/database";

import {
  createValidator,
  idValidator,
  updateValidator,
} from "./product.validator";


export const getAllProducts = createEndpoint({}, async (req, res) => {
  
  const products = await prisma.product.findMany({
    include: {
      Category: true,
      SaleItems: {
        where: {
          Sale: {
            status: "active",
          }
        },
        select: {
          salePrice: true,
          Sale: {
            select: {
              discount: true,
            }
          }
        },
      },
    },
  });
  res.json({
    result: products,
  });
})

export const getProducts = createEndpoint({}, async (req, res) => {
  const { userId } = req;
  const products = await prisma.product.findMany({
    where: {
      Shop: {
        userId,
      },
    }, include: {
      Category: true, }
  });

  res.json({
    result: products,
  });
});

export const getProduct = createEndpoint(idValidator, async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  res.json({
    result: product,
  });
});

export const postProduct = createEndpoint(createValidator, async (req, res) => {
  const { userId } = req;
  const {
    name,
    sku,
    description,
    price,
    stock,
    status,
    images,
    selectedSizes,
    selectedColors,
    sizeChart,
    category,
    measures,
    specifications,
  } = req.body;

  const shop = await prisma.shop.findUnique({
    where: {
      userId,
    },
  });
  if (!shop) {
    throw new Error("Shop not found");
  }

  const sizeC = await prisma.sizeChart.create({
    data: {
      selectedSizes,
      measures,
      sizeChart
    },
  });

  const categoryI = await prisma.category.findUnique({
    where: {
      categoryIdentifier: {
        name: category,
        shopId: shop.id,
      }
    },
  });
  if (!categoryI) {
    throw new Error("Category not found");
  }

  const product = await prisma.product.create({
    data: {
      name,
      sku,
      description,
      price,
      stock,
      status,
      selectedColors,
      images,
      sizeChart,
      type: sizeChart == "tops chart" ? "top" : sizeChart == "bottoms chart" ? "bottom" : "footwear",
      measures,
      selectedSizes,
      specifications,
      sizeChartId: sizeC.id,
      categoryId: categoryI.id,
      shopId: shop.id,
    },
  });

  res.json({
    result: product,
  });
});

export const putProduct = createEndpoint(updateValidator, async (req, res) => {
  const { id } = req.params;
  const {
    name,
    sku,
    description,
    price,
    stock,
    status,
    images,
    selectedSizes,
    selectedColors,
    sizeChart,
    category,
    measures,
  } = req.body;

  console.log(req.body);
  const shop = await prisma.shop.findUnique({
    where: {
      userId: req.userId,
    },
  });
  if (!shop) {
    throw new Error("Shop not found");
  }

  console.log(shop)
  // const categoryI = await prisma.category.findUnique({
  //   where: {
  //     categoryIdentifier: {
  //       name: category,
  //       shopId: shop.id,
  //     }
  //   },
  // });
  // if (!categoryI) {
  //   throw new Error("Category not found");
  // }

  const pro = await prisma.product.update({
    where: {
      id,
      Shop: {
        userId: req.userId,
      },
    },
    data: {
      name,
      sku,
      description,
      price,
      stock,
      sizeChart,
      type: sizeChart == "tops chart" ? "top" : sizeChart == "bottoms chart" ? "bottom" : "footwear",
      measures,
      selectedSizes,
      status,
      selectedColors,
      images,
      // categoryId: categoryI.id,
    },
  });

  res.json({
    result: pro,
  });
});

export const updateProductStatus = createEndpoint(
  idValidator,
  async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const { status } = req.body;

    const product = await prisma.product.update({
      where: {
        id,
        Shop: {
          userId: req.userId,
        },
      },
      data: {
        status
      },
    });
    res.json({
      result: product,
    });
  }
);

export const notifyMe = createEndpoint(idValidator, async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  const buyer = await prisma.buyer.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!buyer) {
    throw new Error("Buyer not found");
  }

  let notifiedProduct = await prisma.notifiedProduct.findFirst({
    where: {
      productId: id,
      buyerId: buyer.id,
    }
  });

  if (notifiedProduct) {
    await prisma.notifiedProduct.delete({
      where: {
        id: notifiedProduct.id,
      }
    });
  } else {
      await prisma.notifiedProduct.create({
      data: {
        productId: id,
        buyerId: buyer.id,
      },
    });
  }

  res.json({
    result: notifiedProduct ? false : true
  });
});

export const deleteProduct = createEndpoint(idValidator, async (req, res) => {
  const { id } = req.params;

  await prisma.product.delete({
    where: {
      id,
      Shop: {
        userId: req.userId,
      },
    },
  });

  res.json({
    result: "Deleted product",
  });
});

export const deleteProducts = createEndpoint({}, async (req, res) => {
  const { userId } = req;

  await prisma.product.deleteMany({
    where: {
      Shop: {
        userId,
      },
    },
  });

  res.json({
    result: "Deleted all products",
  });
});
export default postProduct;