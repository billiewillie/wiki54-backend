import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
	pathName: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Department', DepartmentSchema);
