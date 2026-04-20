import express from 'express';

import retailerRoute from './retailer/retailer.routes';
import buyerRoute from './buyer/buyer.routes';
import adminRoute from './admin/admin.routes';

const router = express.Router();

router.use('/retailer', retailerRoute);
router.use('/buyer', buyerRoute);
router.use('/admin', adminRoute)

export default router;