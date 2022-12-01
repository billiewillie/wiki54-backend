import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'напишите email пожалуйста'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'напишите пароль пожалуйста'],
	},
	department: {
		type: String,
		default: 'studia54',
		required: [true, 'напишите ваш отдел пожалуйста'],
	},
	role: {
		type: String,
		default: 'user',
		required: [true, 'укажите роль пользователя на сайте пожалуйста'],
	},
	isMapOpened: {
		type: Boolean,
		default: false,
	},
});

export default mongoose.model('User', UserSchema);
