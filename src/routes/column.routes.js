import Router from 'express';

import { getColumns, createColumns } from '../controllers/column.controllers.js'; // getColumn, createColumns

const router = Router();

router.get('/columns', getColumns);
router.post('/columns', createColumns);

export default router;
