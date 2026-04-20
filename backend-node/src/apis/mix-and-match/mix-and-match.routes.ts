import express from "express";

import { isAuth } from "@/services";
import { addItem, removeItem, getItems } from "./mix-and-match.controller";

const router = express.Router();

router.get("/", isAuth(), getItems);

router.post("/", isAuth(), addItem);

router.delete("/:id", isAuth(), removeItem);

export default router;
