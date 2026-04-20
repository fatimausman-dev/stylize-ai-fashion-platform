import express from "express";

import { isAuth } from "@/services";

import {
  postProduct,
  getProduct,
  getProducts,
  putProduct,
  updateProductStatus,
  notifyMe,
  deleteProduct,
  deleteProducts,
  getAllProducts,
} from "./product.controller";

const router = express.Router();

router.get("/", isAuth(), getProducts);
router.get("/all-products", isAuth(), getAllProducts);
router.get("/:id", isAuth(), getProduct);

router.post("/", isAuth(), postProduct);
router.post("/:id", isAuth(), notifyMe);

router.put("/:id", isAuth(), putProduct);
router.put("/update-status/:id", isAuth(), updateProductStatus);

router.delete("/:id", isAuth(), deleteProduct);
router.delete("/", isAuth(), deleteProducts);

export default router;
