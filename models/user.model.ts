import { Schema, model, Types } from 'mongoose';

export interface IUser {
	_id: Types.ObjectId;
	fullName: string;
	username: string;
	password: string;
	gender: 'male' | 'female';
	profilePic?: string;
}

const userSchema = new Schema<IUser>(
	{
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
	},
	{ timestamps: true },
);

const User = model('User', userSchema);

export default User;
