import createError from "http-errors";
import { createEndpoint } from "@/commons";
import { prisma } from "@/database";

import { infoValidator } from "./businessInfo.validator";

export const addInfo = createEndpoint(infoValidator, async (req, res, next) => {
  const { name, description, logo, productsType } = req.body;
  console.log(req.body);
  const existingShopName = await prisma.shop.findUnique({
    where: {
      name,
    },
  });

  if (existingShopName) throw createError(409, "Shop name already exists");

  const shop = await prisma.shop.create({
    data: {
      name,
      description,
      logo,
      productsType,
      userId: req.userId,
    },
  });

  res.json({
    result: shop,
  });

});

export const updateInfo = createEndpoint(
  infoValidator,
  async (req, res, next) => {
    const { name, description, logo, productsType } = req.body;

    const existingShopName = await prisma.shop.findUnique({
      where: {
        name,
      },
    });
  
    if (existingShopName) throw createError(409, "Shop name already exists");

    const shop = await prisma.shop.update({
      where: {
        userId: req.userId,
      },
      data: {
        name,
        description,
        logo,
        productsType,
      },
    });

    res.json({
      result: shop,
    });
  }
);
