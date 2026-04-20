import express from "express";

import { isAuth } from "@/services";
import { addItem, getWishlist, removeItem, delWislist } from "./wishlist.controller";

const router = express.Router();

router.get("/", isAuth(), getWishlist);

router.post("/", isAuth(), addItem);

router.delete("/:id", isAuth(), removeItem);
router.delete("/", isAuth(), delWislist);

export default router;
