import { createEndpoint } from "@/commons";
import { prisma } from "@/database";
import createError from "http-errors";

import { infoValidator, updateInfoValidator } from "./retailer.validator";

export const getRetailerInfo = createEndpoint(
  {},
  async (req, res, next) => {
    const shop = await prisma.shop.findUnique({
      where: {
        userId: req.userId,
      },
    });

    if (shop) {
      const retailer = await prisma.retailer.findUnique({
        where: { shopId: shop.id },
        select: {
          accountTitle: true,
          accountNo: true,
          accountIban: true,
          bankName: true,
          branchName: true,
          branchCode: true,
          bankCopy: true,
        },
      });
      res.json({ result: retailer });
    } else throw createError(409, "Shop does not exist");
  }
);

export const postRetailerInfo = createEndpoint(
  infoValidator,
  async (req, res) => {
    const { userId } = req;
    const {
      name,
      nic,
      idDocFront,
      idDocBack,
      accountTitle,
      accountNo,
      accountIban,
      bankName,
      branchName,
      branchCode,
      bankCopy,
    } = req.body;

    const shop = await prisma.shop.findUnique({
      where: {
        userId,
      },
    });

    if (shop) {
      const retailer = await prisma.retailer.create({
        data: {
          name,
          nic,
          idDocFront: idDocFront ?? "",
          idDocBack: idDocBack ?? "",
          accountTitle,
          accountNo,
          accountIban,
          bankName,
          branchName,
          branchCode,
          bankCopy: bankCopy ?? "",
          shopId: shop.id,
        },
      });

      res.json({
        result: retailer,
      });
    } else throw createError(409, "Shop does not exist");
  }
);

export const updateRetailerInfo = createEndpoint(
  updateInfoValidator,
  async (req, res) => {
    const { userId } = req;
    const {
      accountTitle,
      accountNo,
      accountIban,
      bankName,
      branchName,
      branchCode,
      bankCopy,
    } = req.body;

    const shop = await prisma.shop.findUnique({
      where: {
        userId,
      },
    });

    if (shop) {
      const retailer = await prisma.retailer.update({
        where: {
          shopId: shop.id,
        },
        data: {
          accountTitle,
          accountNo,
          accountIban,
          bankName,
          branchName,
          branchCode,
          bankCopy: bankCopy ?? "",
        },
      });

      res.json({
        result: retailer,
      });
    } else throw createError(409, "Shop does not exist");
  }
);
