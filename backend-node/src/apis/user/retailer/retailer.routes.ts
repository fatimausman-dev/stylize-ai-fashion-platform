import express from "express";

import { getRetailerInfo, postRetailerInfo, updateRetailerInfo } from "./retailer.controller";
import { isAuth } from "@/services";

const router = express.Router();

router.get("/", isAuth(), getRetailerInfo);
router.post("/", isAuth(), postRetailerInfo);
router.put("/", isAuth(), updateRetailerInfo);

export default router;