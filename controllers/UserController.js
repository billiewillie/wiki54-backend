import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';

export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check for user email
	const user = await User.findOne({ email });

	if (user && bcrypt.compare(password, user.password)) {
		res.json({
			_id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			departments: user.departments,
			isMapOpened: user.isMapOpened,
			isAdmin: user.isAdmin,
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
