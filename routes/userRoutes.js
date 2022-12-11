import express from 'express';
import { loginUser, getMe } from '../controllers/userController.js';
import checkAuth from '../utils/checkAuth.js';
const router = express.Router();

router.post('/login', loginUser);
router.get('/me', checkAuth, getMe);

export default router;
