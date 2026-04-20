import express from "express";

import { addInfo, updateInfo } from "./businessInfo.controller"
import { isAuth } from "@/services";

const router = express.Router();

router.post('/', isAuth(), addInfo);
router.put('/', isAuth(), updateInfo);

export default router;