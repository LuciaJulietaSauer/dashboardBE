import Router from 'express';

import pool from '../db.js';

const router = Router();

router.get('/ping', async (_, res) => {
  const [result] = await pool.query('SELECT "Pong" AS result');
  res.json(result[0]);
});

export default router;
