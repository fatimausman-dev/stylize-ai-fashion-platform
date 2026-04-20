import express from "express";

import otherRoute from "./other/other.routes";
import retailerRoute from "./retailer/retailer.routes";
import buyerRoute from "./buyer/buyer.routes";

const router = express.Router();

router.use("/", otherRoute);
router.use("/retailer", retailerRoute);
router.use("/buyer", buyerRoute);

export { router as api };

export default router;
