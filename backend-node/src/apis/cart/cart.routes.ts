import express from "express";

import { isAuth } from "@/services";
import { addItem, getCart, removeItem, delCart, updateItemQuantity, updateCart } from "./cart.controller";

const router = express.Router();

router.get("/", isAuth(), getCart);

router.post("/", isAuth(), addItem);

router.put("/", isAuth(), updateCart);
router.put("/:id", isAuth(), updateItemQuantity);

router.delete("/", isAuth(), delCart);
router.delete("/:id", isAuth(), removeItem);

export default router;
