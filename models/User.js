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
		required: [true, 'напишите ваш отдел пожалуйста'],
	},
	role: {
		type: String,
		required: [true, 'укажите роль пользователя на сайте пожалуйста'],
	},
});

export default mongoose.model('User', UserSchema);
