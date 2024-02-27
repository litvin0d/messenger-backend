import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';

import User from '../../models/user.model';
import generateTokenAndSetCookie from '../../utils/generateToken';

type signupData = {
	fullName: string;
	username: string;
	password: string;
	confirmPassword: string;
	gender: 'male' | 'female';
};

export const signup = async (req: Request, res: Response) => {
	try {
		const fullName = (req.body as signupData).fullName.trim();
		const username = (req.body as signupData).username.trim();
		const password = (req.body as signupData).password.trim();
		const confirmPassword = (req.body as signupData).confirmPassword.trim();
		const gender = (req.body as signupData).gender.trim();

		// fullName validation
		if (fullName.length < 1) return res.status(400).json({ error: 'Full Name is required' });
		if (fullName.length > 64) return res.status(400).json({ error: 'Full Name is too long' });

		// username validation
		if (username.length < 3) return res.status(400).json({ error: 'Username must be at least 3 characters' });
		if (/\s/.test(username)) return res.status(400).json({ error: 'Username must not contain spaces' });

		// password validation
		if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
		if (/\s/.test(password)) return res.status(400).json({ error: 'Password must not contain spaces' });

		// check if password passwords don't match
		if (password !== confirmPassword) return res.status(400).json({ error: 'Password mismatch' });

		// gender validation
		if (gender.length < 1) return res.status(400).json({ error: 'Gender is required' });
		if (gender !== 'male' && gender !== 'female')
			return res.status(400).json({ error: 'There is only two genders: male and female' });

		// check if user already exists
		// noinspection TypeScriptValidateTypes
		const user = await User.findOne({ username });
		if (user) return res.status(400).json({ error: 'User with this username already exists' });

		// hashing password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// getting profile picture via https://avatar-placeholder.iran.liara.run/
		const profilePic = `https://avatar.iran.liara.run/public/${gender === 'male' ? 'boy' : 'girl'}?username=${username}`;

		// creating new user
		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic,
		});

		// saving new user in db
		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				password: newUser.password,
				gender: newUser.gender,
				profilePic: profilePic,
			});
		} else {
			res.status(400).json({ error: 'Invalid user data' });
		}
	} catch (error) {
		res.status(500).json({
			error: 'Internal Server Error',
		});

		if (error instanceof Error) {
			throw new Error(`Signup error: ${error.message}`);
		}
	}
};
