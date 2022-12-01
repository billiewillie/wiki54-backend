import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';

export const registerUser = asyncHandler(async (req, res) => {
	const { email, password, department, role } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error('Пожалуйста заполните все поля');
	}

	// Check if user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		email,
		password: hashedPassword,
		department,
		role,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			email: user.email,
			department: user.department,
			role: user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('неправильные данные');
	}
});

export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check for user email
	const user = await User.findOne({ email });

	if (user && bcrypt.compare(password, user.password)) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};
