import { createEndpoint } from "@/commons";
import { prisma } from "@/database";
import createError from "http-errors";

import { StudioCategory } from "@prisma/client";
import { idValidator } from "./mix-and-match.validator";

export const getItems = createEndpoint({}, async (req, res) => {
    const { userId } = req;

    const buyer = await prisma.buyer.findUnique({
        where: {
            userId
        }
    });

    if (!buyer) {
        throw createError(404, "Buyer not found");
    }

    const studio = await prisma.studio.findUnique({
        where: {
            buyerId: buyer.id
        }
    });

    if (!studio) {
        throw createError(404, "Studio not found");
    }

    const items = await prisma.studioItem.findMany({
        where: {
            studioId: studio.id
        },
    });

    res.json({
        result: items
    });
});

export const addItem = createEndpoint({}, async (req, res) => {
    const { userId } = req;
    const { productId } = req.body;

    const buyer = await prisma.buyer.findUnique({
        where: {
            userId
        }
    });

    if (!buyer) {
        throw createError(404, "Buyer not found");
    }

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        },
        select: {
            images: true,
            type: true,
        }
    });

    if (!product) {
        throw createError(404, "Product not found");
    }

    let studio = await prisma.studio.findUnique({
        where: {
            buyerId: buyer.id
        }
    });

    if (!studio) {
        studio = await prisma.studio.create({
            data: {
                buyerId: buyer.id
            }
        });
    }

    const item = await prisma.studioItem.create({
        data: {
            studioId: studio.id,
            product: product.images[0],
            studioCategory: product.type === "top" ? StudioCategory.TOPS : product.type === "bottom" ? 
            StudioCategory.BOTTOMS : product.type === "footwear" ? StudioCategory.FOOTWEAR : StudioCategory.FOOTWEAR
        }
    });

    res.json({
        result: item
    });
});

export const removeItem = createEndpoint(idValidator, async (req, res) => {
    const { userId } = req;
    const { id } = req.params;

    const buyer = await prisma.buyer.findUnique({
        where: {
            userId
        }
    });

    if (!buyer) {
        throw createError(404, "Buyer not found");
    }

    const studio = await prisma.studio.findUnique({
        where: {
            buyerId: buyer.id
        }
    });

    if (!studio) {
        throw createError(404, "Studio not found");
    }

    const item = await prisma.studioItem.findUnique({
        where: {
            id
        }
    });

    if (!item) {
        throw createError(404, "Item not found");
    }

    if (item.studioId !== studio.id) {
        throw createError(403, "Item does not belong to the studio");
    }

    await prisma.studioItem.delete({
        where: {
            id
        }
    });

    res.json({
        result: item
    });
});