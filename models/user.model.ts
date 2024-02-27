import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		maxLength: 64
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3
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

const User = mongoose.model('User', userSchema);

export default User;
