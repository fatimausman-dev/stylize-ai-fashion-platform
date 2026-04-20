import createError from "http-errors";
import { createEndpoint } from "@/commons";
import { prisma } from "@/database";

import { infoValidator } from "./contact.validator";

export const addContact = createEndpoint(
  infoValidator,
  async (req, res, next) => {
    const { phone, email, socials } = req.body;

    const shop = await prisma.shop.findUnique({
      where: {
        userId: req.userId,
      },
    });

    if (shop) {
      const contact = await prisma.shop.update({
        where: {
          userId: req.userId,
        },
        data: {
          phone,
          email,
          socials,
        },
      });

      res.json({
        result: contact,
      });
    } else {
      throw createError(409, "Shop does not exist");
    }
  }
);

export const updateContact = createEndpoint(
  infoValidator,
  async (req, res, next) => {
    const { phone, email, socials } = req.body;

    const shop = await prisma.shop.findUnique({
      where: {
        userId: req.userId,
      },
    });

    if (shop) {
      const contact = await prisma.shop.update({
        where: {
          userId: req.userId,
        },
        data: {
          phone,
          email,
          socials,
        },
      });

      res.json({
        result: contact,
      });
    } else {
      throw createError(409, "Shop does not exist");
    }
  }
);
