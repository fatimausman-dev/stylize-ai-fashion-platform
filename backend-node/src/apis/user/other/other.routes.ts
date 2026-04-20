import express from "express";

import { getMe, forgotPassword, resetPassword } from "./other.controller";
import { isAuth } from "@/services";

const router = express.Router();

router.get("/@me", isAuth(), getMe);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

export default router;
