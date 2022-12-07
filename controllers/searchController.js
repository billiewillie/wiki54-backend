import Post from '../models/Post.js';
import asyncHandler from 'express-async-handler';

export const getAll = asyncHandler(async (req, res) => {
	const { q } = req.query;
	const keys = ['title', 'body'];
	const regex = new RegExp(q, 'i'); // i for case insensitive

	const search = (data) => {
		return data.filter((item) => keys.some((key) => item[key].includes(q)));
	};

	const posts = await Post.find({
		$or: [
			{
				title: { $regex: regex },
			},
			{
				body: { $regex: regex },
			},
		],
	});

	const newPosts = posts.map((post) => ({
		...post._doc,
		body: post.body.replace(/(<([^>]+)>)/gi, ''),
	}));

	const result = search(newPosts);

	console.log(result);

	res.status(200).json(result);
});
