import createError from "http-errors";
import { createEndpoint } from "@/commons";
import { prisma } from "@/database";
import { SaleCategory } from "@prisma/client";

export const getSales = createEndpoint({}, async (req, res) => {

  const { userId } = req;

  await prisma.sale.deleteMany({
    where: { Shop: {
      userId: userId,
    },
    endDate: { lt: new Date() } },
  });

  const sales = await prisma.sale.findMany({
    where: {
      Shop: {
        userId: userId,
      },
    },
    include: {
      SaleItems: {
        include: {
          Product: {
            select: {
              name: true,
              price: true,
              Category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!sales) throw createError(404, "No sales found");

  res.json({
    result: sales,
  });
});

export const getSale = createEndpoint({}, async (req, res) => {
  const { id } = req.params;
  const sale = await prisma.sale.findUnique({ where: { id } });

  if (!sale) throw createError(404, "Sale not found");

  res.json({
    result: sale,
  });
});

export const postSale = createEndpoint({}, async (req, res) => {
  const { userId } = req;
  const { newSale } = req.body;

  const shop = await prisma.shop.findUnique({ where: { userId } });

  if (!shop) throw createError(404, "Shop not found");

  const sale = await prisma.sale.findFirst({
    where: {
      shopId: shop.id,
      coupon: newSale.coupon,
    },
  });

  if (sale) throw createError(400, "Coupon name already exists");

  const startDate = new Date(newSale.startDate);
  const endDate = new Date(newSale.endDate);

  console.log(newSale.products, newSale.categories);

  let products: any[];

  if (newSale.saleCategory == "ALL") {
    products = await prisma.product.findMany({
      where: {
        shopId: shop.id,
      },
    });
  }

  if (newSale.saleCategory == "CATEGORIES") {
    products = await prisma.category.findMany({
      where: {
        shopId: shop.id,
        name: {
          in: newSale.categories,
        },
      },
      select: {
        products: true,
      },
    });
  }

  if (newSale.saleCategory == "PRODUCTS") {
    products = await prisma.product.findMany({
      where: {
        shopId: shop.id,
        name: {
          in: newSale.products,
        },
      },
    });

    console.log(newSale.products, newSale.categories);
    console.log(products);

    // find if there is an active sale that overlaps with the new sale
    const sales = await prisma.sale.findMany({
      where: {
        shopId: shop.id,
        AND: [
          {
            status: "active", // Filtering for active sales
          },
          {
            OR: [
              {
                AND: [
                  { startDate: { lte: endDate } },
                  { endDate: { gte: startDate } },
                ],
              },
              {
                AND: [
                  { startDate: { lte: endDate } },
                  { endDate: { gte: startDate } },
                ],
              },
            ],
          },
        ],
      },
      select: { SaleItems: true },
    });
    console.log(sales);
    if (sales.length > 0) {
      let overlappingProducts: any[] = [];
      sales.forEach((sale) => {
        sale.SaleItems.forEach((saleItem) => {
          // check if the product is in the overlapping sale
          products.forEach((product: any) => {
            if (product.id == saleItem.productId) {
              overlappingProducts.push(product);
            }
          });
        });
      });
      console.log(overlappingProducts);
      if (overlappingProducts.length > 0) {
        throw createError(
          400,
          "There is an active sale that overlaps with the new sale"
        );
      }
    }

    const nSale = await prisma.sale.create({
      data: {
        coupon: newSale.coupon,
        saleCategory:
          newSale.saleCategory == "ALL"
            ? SaleCategory.ALL
            : newSale.saleCategory == "CATEGORIES"
            ? SaleCategory.CATEGORIES
            : SaleCategory.PRODUCTS,
        discount: newSale.discount,
        startDate: startDate,
        endDate: endDate,
        status: newSale.status,
        shopId: shop.id,
      },
    });

    const saleItems = await prisma.saleItem.createMany({
      data: products.map((product) => {
        return {
          productId: product.id,
          saleId: nSale.id,
          salePrice: product.price - (product.price * newSale.discount) / 100,
        };
      }),
    });

    res.json({
      result: "Sale created successfully",
    });
  }
});

export const updateStatus = createEndpoint({}, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const currentSale = await prisma.sale.findUnique({
    where: { id: parseInt(id) },
    select: { status: true },
  });

  if (!currentSale) {
    throw createError(404, "Sale not found.");
  }

  const sale: any = await prisma.sale.update({
    where: { id: parseInt(id) },
    data: {
      status: currentSale.status == "active" ? "disabled" : "active",
    },
  });

  console.log(sale);
  res.json({
    result: sale.status,
  });
});

export const updateSale = createEndpoint({}, async (req, res) => {
  const { id } = req.params;
  const { sale } = req.body;

  const startDate = new Date(sale.startDate);
  const endDate = new Date(sale.endDate);

  let products: any[] = [];

  if (sale.saleCategory == "ALL") {
    products = await prisma.product.findMany({
      where: {
        shopId: sale.shopId,
      },
    });
  }

  if (sale.saleCategory == "CATEGORIES") {
    products = await prisma.category.findMany({
      where: {
        shopId: sale.shopId,
        name: {
          in: sale.categories,
        },
      },
      select: {
        products: true,
      },
    });
  }

  if (sale.saleCategory == "PRODUCTS") {
    products = await prisma.product.findMany({
      where: {
        shopId: sale.shopId,
        name: {
          in: sale.products,
        },
      },
    });

    console.log(sale.products, sale.categories);
    console.log(products);
  }
  // find if there is an active sale that overlaps with the new sale
  const sales = await prisma.sale.findMany({
    where: {
      shopId: sale.shopId,
      AND: [
        {
          id: { not: parseInt(id) },
        },
        {
          status: "active", // Filtering for active sales
        },
        {
          OR: [
            {
              AND: [
                { startDate: { lte: endDate } },
                { endDate: { gte: startDate } },
              ],
            },
            {
              AND: [
                { startDate: { lte: endDate } },
                { endDate: { gte: startDate } },
              ],
            },
          ],
        },
      ],
    },
    select: { SaleItems: true },
  });
  console.log(sales);
  if (sales.length > 0) {
    let overlappingProducts: any[] = [];
    sales.forEach((sale) => {
      sale.SaleItems.forEach((saleItem) => {
        // check if the product is in the overlapping sale
        products.forEach((product: any) => {
          if (product.id == saleItem.productId) {
            overlappingProducts.push(product);
          }
        });
      });
    });
    console.log(overlappingProducts);
    if (overlappingProducts.length > 0) {
      throw createError(
        400,
        "There is an active sale that overlaps with the new sale"
      );
    }
  }

  const updatedSale = await prisma.sale.update({
    where: { id: parseInt(id) },
    data: {
      coupon: sale.coupon,
      discount: sale.discount,
      saleCategory:
        sale.saleCategory == "ALL"
          ? SaleCategory.ALL
          : sale.saleCategory == "CATEGORIES"
          ? SaleCategory.CATEGORIES
          : SaleCategory.PRODUCTS,
      startDate: startDate,
      endDate: endDate,
      status: sale.status,
    },
  });

  // UPDATE ITEMS (SOME MIGHT BE EXCLUDED, SOME INCLUED, SOME JUST UPDATED )
  await prisma.saleItem.deleteMany({
    where: {
      saleId: parseInt(id),
      productId: { notIn: products.map((product) => product.id) },
    },
  });

  for (const product of products) {
    await prisma.saleItem.upsert({
      where: {
        saleItemProductIdentifier: {
          saleId: parseInt(id),
          productId: product.id,
        },
      },
      update: {
        salePrice: product.price - (product.price * sale.discount) / 100,
      },
      create: {
        saleId: parseInt(id),
        productId: product.id,
        salePrice: product.price - (product.price * sale.discount) / 100,
      },
    });
  }

  res.json({
    result: updatedSale,
  });
});

export const deleteSale = createEndpoint({}, async (req, res) => {
  const { id } = req.params;

  await prisma.sale.delete({ where: { id: parseInt(id) } });

  res.json({
    result: "Sale removed successfully!",
  });
});
