import Post from '../models/Post.js';
import asyncHandler from 'express-async-handler';

export const getAll = asyncHandler(async (req, res) => {
	const { department } = req.params;
	const posts = await Post.find({ department });
	res.status(200).json(posts);
});

export const create = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please enter a text');
	}
	console.log(req.body);
	// const { department } = req.params;
	// res.status(200).json({ message: `create a post for ${department}` });
	// try {
	// 	const doc = new PostModel({
	// 		title: req.body.title,
	// 		text: req.body.text,
	// 		imageUrl: req.body.imageUrl,
	// 		tags: req.body.tags.split(','),
	// 		user: req.userId,
	// 	});

	// 	const post = await doc.save();
	// 	res.json(post);
	// } catch (error) {
	// 	res.status(500).json({
	// 		message: 'Не удалось создать статью',
	// 	});
	// }
});

export const getOne = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const post = await Post.findById(id);
	res.status(200).json(post);
});

export const remove = asyncHandler(async (req, res) => {
	const { id, department } = req.params;

	res.status(200).json({ message: `delete a post ${id} of ${department}` });
	// try {
	// 	PostModel.findOneAndDelete(
	// 		{
	// 			_id: req.params.id,
	// 		},
	// 		(err, doc) => {
	// 			if (err) {
	// 				return res.status(500).json({
	// 					message: 'didnt delete an article',
	// 				});
	// 			}
	// 			if (!doc) {
	// 				return res.status(500).json({
	// 					message: 'no such article',
	// 				});
	// 			}
	// 			res.json({
	// 				success: true,
	// 			});
	// 		}
	// 	);
	// } catch (error) {
	// 	res.status(500).json({
	// 		message: 'Не удалось получить статью',
	// 	});
	// }
});

export const update = asyncHandler(async (req, res) => {
	const { id, department } = req.params;

	// const search = (data) => {
	// 	return data.filter((item) => item.id === Number(id))[0];
	// };

	res.status(200).json({ message: `update a post ${id} of ${department}` });
	// try {
	// 	await PostModel.findOneAndUpdate(
	// 		{
	// 			_id: req.params.id,
	// 		},
	// 		{
	// 			title: req.body.title,
	// 			text: req.body.text,
	// 			imageUrl: req.body.imageUrl,
	// 			tags: req.body.tags.split(','),
	// 			user: req.userId,
	// 		}
	// 	);
	// 	res.json({
	// 		success: true,
	// 	});
	// } catch (error) {
	// 	res.status(500).json({
	// 		message: 'Не удалось получить статью',
	// 	});
	// }
});
