import express from 'express'
import { getInsights } from './retail.controller';
import { isAuth } from '@/services';

const router = express.Router();

router.get('/', isAuth(), getInsights);

export default router;