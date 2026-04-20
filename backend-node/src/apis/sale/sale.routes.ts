import { isAuth } from '@/services';
import express from 'express';

import { postSale, updateSale, updateStatus, deleteSale, getSale, getSales } from './sale.controller';

const router = express.Router();

router.get('/', isAuth(), getSales);
router.get('/:id', isAuth(), getSale);

router.post('/', isAuth(), postSale);

router.put('/:id', isAuth(), updateSale);

router.patch('/:id', isAuth(), updateStatus);

router.delete('/:id', isAuth(), deleteSale);

export default router;