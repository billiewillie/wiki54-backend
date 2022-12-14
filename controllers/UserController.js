import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import Department from '../models/Department.js';

export const registerUser = asyncHandler(async (req, res) => {
	const { email, password, firstName, lastName, position, placeId, photo, skypeId, isAdmin, isMapOpened, departments } = req.body;

	const doc = new User({
		email,
		password,
		firstName,
		lastName,
		position,
		placeId,
		photo,
		skypeId,
		isAdmin,
		isMapOpened,
		departments,
	});

	const user = await doc.save();
	res.json(user);
});

export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check for user email
	const user = await User.findOne({ email }).populate({ path: 'departments', model: 'Department' });

	if (user && bcrypt.compare(password, user.password)) {
		res.json({
			_id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			departments: user.departments,
			isMapOpened: user.isMapOpened,
			isAdmin: user.isAdmin,
			photo: user.photo,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

export const getMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.userId).populate('departments').exec();

	if (!user) {
		return res.status(404).json({
			message: 'Пользователь не найден',
		});
	}

	const { passwordHash, ...userData } = user._doc;

	res.json(userData);
});

export const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find();

	res.json(users);
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};
