import express from 'express';
import { loginUser, getMe, getUsers } from '../controllers/userController.js';
import checkAuth from '../utils/checkAuth.js';
const router = express.Router();

router.route('/').get(getUsers);
router.route('/login').post(loginUser);
router.route('/me').get(checkAuth, getMe);

export default router;
