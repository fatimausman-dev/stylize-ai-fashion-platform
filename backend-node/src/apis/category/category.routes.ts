import express from "express";

import { isAuth } from "@/services";

import { deleteCategories, deleteCategory, getCategories, getCategory, postCategory, putCategory } from "./category.controller";

const router = express.Router();

router.get("/", isAuth(), getCategories);
router.get("/:id", isAuth(), getCategory);

router.post("/", isAuth(), postCategory);

router.put("/:id", isAuth(), putCategory);

router.delete("/:id", isAuth(), deleteCategory);
router.delete("/", isAuth(), deleteCategories);

export default router;
