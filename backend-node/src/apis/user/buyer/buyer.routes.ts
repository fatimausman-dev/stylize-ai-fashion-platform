import express from "express";

import { isAuth } from "@/services";
import { getSizeMeasurements, SaveMeasurements, getSizeRecommendation } from "./buyer.controller";

const router = express.Router();

router.get("/:id/recommend-size", isAuth(), getSizeRecommendation);
router.get("/size-chart", isAuth(), getSizeMeasurements);
router.put("/", isAuth(), SaveMeasurements);

export default router;