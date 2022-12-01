import express from 'express';
import { getAll, create, getOne, update, remove } from '../controllers/postController.js';

const router = express.Router();

router.route('/:department').get(getAll).post(create);
router.route('/:department/:id').get(getOne).patch(update).delete(remove);

export default router;
