import createError from "http-errors";
import { createEndpoint } from "@/commons";
import { prisma } from "@/database";

import { infoValidator } from "./policy.validator";

export const addPolicies = createEndpoint(
  infoValidator,
  async (req, res, next) => {
    const { refund, shipping, shippingFee, returnPolicy } = req.body;

    const shop = await prisma.shop.findUnique({
      where: {
        userId: req.userId,
      },
    });

    if (shop) {
      const policy = await prisma.policy.create({
        data: {
          refund,
          returnPolicy,
          shipping,
          shippingFee,
          shopId: shop.id,
        },
      });

      res.json({
        result: policy,
      });
    }

    else {
      throw createError(409, "Shop does not exist");
    }
  }
);

export const updatePolicies = createEndpoint(
  infoValidator,
  async (req, res, next) => {
    const { refund, shipping, shippingFee, returnPolicy } = req.body;

    const shop = await prisma.shop.findUnique({
      where: {
        userId: req.userId,
      },
    });

    if (shop) {
      const policy = await prisma.policy.update({
        where: {
          shopId: shop.id,
        },
        data: {
          refund,
          returnPolicy,
          shipping,
          shippingFee,
        },
      });

      res.json({
        result: policy,
      });
    }

    else {
      throw createError(409, "Shop does not exist");
    }
  }
);
