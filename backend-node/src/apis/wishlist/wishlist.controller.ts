import { createEndpoint } from "@/commons";
import { prisma } from "@/database";
import createError from "http-errors";

export const getWishlist = createEndpoint({}, async (req, res) => {
    const userId = req.userId;

    const buyer = await prisma.buyer.findUnique({
        where: {
            userId: userId,
        },
    });

    if (!buyer) {
        throw new createError.NotFound("Buyer not found");
    }

    const wishlist = await prisma.wishlist.findUnique({
        where: {
            buyerId: buyer.id,
        },
        include: {
            WishlistItems: true,
        }
    });

    if (!wishlist) {
        throw new createError.NotFound("Wishlist not found");
    }

    wishlist.WishlistItems = await prisma.wishlistItem.findMany({
        where: {
            wishlistId: wishlist.id,
        },
        include: {
            Product: true,
        }
    })

    res.json({
        result: wishlist,
    });
});

export const addItem = createEndpoint({}, async (req, res) => {
    const userId = req.userId;
    const { productId } = req.body;

    let wishlist;

    const buyer = await prisma.buyer.findUnique({
        where: {
            userId: userId,
        },
    });

    if (!buyer) {
        throw new createError.NotFound("Buyer not found");
    }

    wishlist = await prisma.wishlist.findUnique({
        where: {
            buyerId: buyer.id,
        },
    });

    if (!wishlist) {
        wishlist = await prisma.wishlist.create({
            data: {
                buyerId: buyer.id,
            }
        });
    }

    const existingItem = await prisma.wishlistItem.findFirst({
        where: {
            wishlistId: wishlist.id,
            productId: productId,
        }
    });

    if (existingItem) {
        throw new createError.Conflict("Item already in wishlist");
    }

    const wishlistItem = await prisma.wishlistItem.create({
        data: {
            wishlistId: wishlist.id,
            productId: productId,
        }
    });

    res.json({
        result: wishlistItem,
    })

});


export const removeItem = createEndpoint({}, async (req, res) => {
    const userId = req.userId;
    const { itemId } = req.params;

    const buyer = await prisma.buyer.findUnique({
        where: {
            userId: userId,
        },
    });

    if (!buyer) {
        throw new createError.NotFound("Buyer not found");
    }

    const wishlist = await prisma.wishlist.findUnique({
        where: {
            buyerId: buyer.id,
        },
    });

    if (!wishlist) {
        throw new createError.NotFound("Wishlist not found");
    }

    const existingItem = await prisma.wishlistItem.findFirst({
        where: {
            wishlistId: wishlist.id,
            id: itemId,
        }
    });

    if (!existingItem) {
        throw new createError.NotFound("Item not found in wishlist");
    }

    await prisma.wishlistItem.delete({
        where: {
            id: existingItem.id,
        }
    });

    res.json({
        result: wishlist,
    })
});

export const delWislist = createEndpoint({}, async (req, res) => {
    const userId = req.userId;

    const buyer = await prisma.buyer.findUnique({
        where: {
            userId: userId,
        },
    });

    if (!buyer) {
        throw new createError.NotFound("Buyer not found");
    }

    const wishlist = await prisma.wishlist.findUnique({
        where: {
            buyerId: buyer.id,
        },
    });

    if (!wishlist) {
        throw new createError.NotFound("Wishlist not found");
    }

    await prisma.wishlistItem.deleteMany({
        where: {
            wishlistId: wishlist.id,
        }
    });

    await prisma.wishlist.delete({
        where: {
            id: wishlist.id,
        }
    });

    res.json({
        result: "Wishlist deleted",
    });
});