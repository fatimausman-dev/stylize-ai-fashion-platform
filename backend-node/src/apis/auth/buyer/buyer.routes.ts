import express from "express";

import { isAuth } from "@/services";

import { signUp, signIn, codeVerify, getLoginDetails, updateLoginDetails, deleteAccount, resendCode } from "./buyer.controller";

const router = express.Router();

router.get("/", isAuth(), getLoginDetails);
router.get("/resend-code", isAuth(), resendCode);

router.post("/sign-up", signUp);
router.post("/code-verify", isAuth(), codeVerify);
router.post("/sign-in", signIn);

router.put("/", isAuth(), updateLoginDetails);

router.delete("/", isAuth(), deleteAccount);

export default router;