import mongoose, { Schema, model } from 'mongoose';

export interface IUser {
	_id: mongoose.Types.ObjectId,
	fullName: string;
	username: string;
	password: string;
	gender: 'male' | 'female';
	profilePic?: string;
}

const userSchema = new Schema<IUser>({
	fullName: {
		type: String,
		required: true,
		maxLength: 64,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	gender: {
		type: String,
		required: true,
		enum: ['male', 'female'],
	},
	profilePic: {
		type: String,
		default: '',
	},
});

const User = model('User', userSchema);

export default User;
