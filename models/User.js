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
		default: [
			{
				nameEng: 'studia54',
				nameRu: 'Студия 54',
			},
		],
	},
	position: String,
	placeId: String,
	photo: String,
	skype: String,
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
