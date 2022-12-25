import express from 'express';
import { loginUser, getMe, getUsers, registerUser } from '../controllers/UserController.js';
import checkAuth from '../utils/checkAuth.js';
const router = express.Router();

router.route('/').get(getUsers);
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/me').get(checkAuth, getMe);

export default router;
