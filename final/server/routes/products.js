import express from 'express';

import {
	getProducts,
	postProduct,
	getProduct,
	patchProduct,
	deleteProduct,
} from '../controllers/products.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', postProduct);
router.get('/:pid', getProduct);
router.patch('/:pid', patchProduct);
router.delete('/:pid', deleteProduct);

export default router;
