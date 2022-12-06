import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
		required: [true, 'напишите email пожалуйста'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'напишите пароль пожалуйста'],
	},
	departments: {
		type: Array,
		default: ['studia54'],
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	isMapOpened: {
		type: Boolean,
		default: false,
	},
});

export default mongoose.model('User', UserSchema);
