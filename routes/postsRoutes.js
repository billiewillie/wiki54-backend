import express from 'express';
import { getAll, create, getOne, update, remove } from '../controllers/PostController.js';
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

router.route('/:userId').get(getAll);
router.route('/:department').post(checkAuth, create);
router.route('/:department/:id').patch(update).delete(remove);

export default router;
