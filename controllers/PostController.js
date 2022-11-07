import PostModel from "../models/Post.js";

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			tags: req.body.tags.split(","),
			user: req.userId,
		});

		const post = await doc.save();
		res.json(post);
	} catch (error) {
		res.status(500).json({
			message: "Не удалось создать статью",
		});
	}
};

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate("user").exec();

		res.json(posts);
	} catch (error) {
		res.status(500).json({
			message: "Не удалось создать статью",
		});
	}
};

export const getOne = async (req, res) => {
	try {
		PostModel.findByIdAndUpdate(
			{
				_id: req.params.id,
			},
			{
				$inc: {
					viewsCount: 1,
				},
			},
			{
				returnDocument: "after",
			},
			(err, doc) => {
				if (err) {
					return res.status(500).json({
						message: "no successfully",
					});
				}
				if (!doc) {
					return res.status(404).json({
						message: "no article found",
					});
				}
				res.json(doc);
			}
		).populate("user");
	} catch (error) {
		res.status(500).json({
			message: "Не удалось получить статью",
		});
	}
};

export const remove = async (req, res) => {
	try {
		PostModel.findOneAndDelete(
			{
				_id: req.params.id,
			},
			(err, doc) => {
				if (err) {
					return res.status(500).json({
						message: "didnt delete an article",
					});
				}
				if (!doc) {
					return res.status(500).json({
						message: "no such article",
					});
				}
				res.json({
					success: true,
				});
			}
		);
	} catch (error) {
		res.status(500).json({
			message: "Не удалось получить статью",
		});
	}
};

export const update = async (req, res) => {
	try {
		await PostModel.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				tags: req.body.tags.split(","),
				user: req.userId,
			}
		);
		res.json({
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			message: "Не удалось получить статью",
		});
	}
};
