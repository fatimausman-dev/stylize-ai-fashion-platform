import express from "express";

import buisnessInfoRoute from "./businessInfo/businessInfo.routes";
import contactInfoRoute from "./contact/contact.routes";
import policyInfoRoute from "./policy/policy.routes";

import { getShops, getShop } from "./shop.controller";
import { isAuth } from "@/services";

const router = express.Router();

router.get("/", isAuth(), getShops);
router.get("/shop-info", isAuth(), getShop);

router.use("/business-info", buisnessInfoRoute);
router.use("/contact-info", contactInfoRoute);
router.use("/policy-info",  policyInfoRoute);

export default router;
