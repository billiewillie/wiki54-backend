import asyncHandler from 'express-async-handler';

import Post from '../models/Post.js';

export const getAll = asyncHandler(async (req, res) => {
	const { department } = req.params;
	const posts = await Post.find({ department });
	res.status(200).json(posts);
});

export const create = asyncHandler(async (req, res) => {
	const doc = new Post({
		department: req.body.department,
		title: req.body.title,
		body: req.body.body,
		tags: req.body.tags,
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
