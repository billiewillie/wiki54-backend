import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
			unique: true,
		},
		tags: {
			type: Array,
			default: [],
		},
		department: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Post', PostSchema);
