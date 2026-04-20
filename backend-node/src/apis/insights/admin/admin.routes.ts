import express from "express";

import { isAuth } from "@/services";

import { calculatePlatformEarnings, getActiveUsersCount, getClients, getMonthlyOrders, updateClientRestriction} from "./admin.controller";

const router = express.Router();
router.get('/',isAuth(), calculatePlatformEarnings);
router.get('/active-users',isAuth(),  getActiveUsersCount);
router.get('/clients', isAuth(),  getClients);
router.patch("/updateClient", isAuth(), updateClientRestriction);
router.get('/monthly-revenue',isAuth(), getMonthlyOrders);

export default router;
