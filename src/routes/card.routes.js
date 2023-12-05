import Router from 'express';

import { createCard, updateCard, deleteCard } from '../controllers/card.controllers.js';

const router = Router();

router.post('/card', createCard);
router.patch('/card/:id', updateCard);
router.delete('/card/:id', deleteCard);

export default router;
