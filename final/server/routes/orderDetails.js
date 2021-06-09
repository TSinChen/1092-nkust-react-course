import express from 'express';

import {
	getOrderDetails,
	postOrderDetail,
	getOrderDetail,
	patchOrderDetail,
	deleteOrderDetail,
} from '../controllers/orderDetails.js';

const router = express.Router();

router.get('/', getOrderDetails);
router.post('/', postOrderDetail);
router.get('/:oid', getOrderDetail);
router.patch('/:seq', patchOrderDetail);
router.delete('/:seq', deleteOrderDetail);

export default router;
