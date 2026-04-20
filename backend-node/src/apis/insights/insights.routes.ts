import express from "express";
import retailRoute from "./retail/retail.routes";
import adminRoute from "./admin/admin.routes";

const router = express.Router();

router.use("/retail", retailRoute);
router.use("/admin", adminRoute);

export { router as api };

export default router;