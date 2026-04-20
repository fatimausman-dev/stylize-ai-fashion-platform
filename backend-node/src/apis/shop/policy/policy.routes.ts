import express from "express";
import { isAuth } from "@/services";

import { addPolicies, updatePolicies } from "./policy.controller";

const router = express.Router();

router.post('/', isAuth(), addPolicies);
router.put('/', isAuth(), updatePolicies);

export default router;