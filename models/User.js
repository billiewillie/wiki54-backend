import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

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
	position: String,
	placeId: String,
	skypeId: String,
	isAdmin: {
		type: Boolean,
		default: false,
	},
	isMapOpened: {
		type: Boolean,
		default: false,
	},
	photo: {
		type: String,
		default: 'http://192.168.88.191:4444/uploads/empty.jpg',
	},
	departments: [
		{
			type: ObjectId,
			ref: 'Department',
		},
	],
});

UserSchema.pre('save', function (next) {
	const defaultID = '63a5749055b9e923763cf27c';
	if (!this.departments.includes(defaultID)) {
		this.departments.push(new mongoose.Types.ObjectId(defaultID));
	}
	next();
});

export default mongoose.model('User', UserSchema);
