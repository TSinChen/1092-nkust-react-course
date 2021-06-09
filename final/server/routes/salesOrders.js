import express from 'express';

import {
	getSalesOrders,
	postSalesOrder,
	getSalesOrder,
	patchSalesOrder,
	deleteSalesOrder,
} from '../controllers/salesOrders.js';

const router = express.Router();

router.get('/', getSalesOrders);
router.post('/', postSalesOrder);
router.get('/:oid', getSalesOrder);
router.patch('/:oid', patchSalesOrder);
router.delete('/:oid', deleteSalesOrder);

export default router;
