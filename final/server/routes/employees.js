import express from 'express';

import { getEmployee } from '../controllers/employees.js';

const router = express.Router();

router.get('/:eid', getEmployee);

export default router;
