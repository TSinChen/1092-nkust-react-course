import express from 'express';

import {
	getCustomers,
	postCustomer,
	getCustomer,
	patchCustomer,
	deleteCustomer,
} from '../controllers/customers.js';

const router = express.Router();

router.get('/', getCustomers);
router.post('/', postCustomer);
router.get('/:cid', getCustomer);
router.patch('/:cid', patchCustomer);
router.delete('/:cid', deleteCustomer);

export default router;
