import asyncHandler from 'express-async-handler';

import Post from '../models/Post.js';
import User from '../models/User.js';
import Department from '../models/Department.js';

export const getAll = asyncHandler(async (req, res) => {
	const { userId } = req.params;
	const { departments } = await User.findById(userId);
	const posts = await Post.find({ department: { $in: departments } })
		.populate({ path: 'department', model: 'Department' })
		.populate({ path: 'user', model: 'User' })
		.exec();

	console.log(posts);
	res.status(200).json(posts);
});

export const create = asyncHandler(async (req, res) => {
	const { title, body, tags, user, department } = req.body;

	const doc = new Post({
		department,
		title,
		body,
		tags,
		user: req.userId,
	});

	const post = await doc.save();

	res.status(200).json(post);
});

export const getOne = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById(id);
	res.status(200).json(post);
});

export const remove = asyncHandler(async (req, res) => {
	const { id } = req.params;

	await Post.findByIdAndRemove(id);
	res.status(200).json({ id });
});

export const update = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
	res.status(200).json(post);
});
