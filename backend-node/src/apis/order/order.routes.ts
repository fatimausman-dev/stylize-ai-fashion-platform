import express from "express";

import { createOrder, deleteOrder, deleteOrders, getOrder, getOrders, getBuyerOrders, updateStatus, deleteBuyerOrder, deleteBuyerOrders, updatePaymentStatus } from "./order.controller";
import { isAuth } from "@/services";

const router = express.Router();

router.get("/shop-orders", isAuth(), getOrders);   
router.get("/all-orders", isAuth(), getBuyerOrders); 
router.get("/:id", isAuth(), getOrder);

router.post("/", isAuth(), createOrder);

router.patch("/:id/order-status", isAuth(), updateStatus);
router.patch("/:id/payment-status", isAuth(), updatePaymentStatus);

router.patch("/delete-all", isAuth(), deleteOrders);
router.patch("/:id/delete-retail-order", isAuth(), deleteOrder);
router.patch("/clear-log", isAuth(), deleteBuyerOrders);
router.patch("/delete-order/:id", isAuth(), deleteBuyerOrder);

export default router;
