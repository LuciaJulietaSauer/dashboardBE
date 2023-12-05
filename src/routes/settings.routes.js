import Router from 'express';

import { getSetting, updateSetting } from '../controllers/settings.controllers.js';

const router = Router();

router.get('/settings/:code', getSetting);
router.put('/settings/:code', updateSetting);

export default router;
