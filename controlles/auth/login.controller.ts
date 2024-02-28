import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express'

import User from '../../models/user.model';
import generateTokenAndSetCookie from '../../utils/generateToken';
import type { IUser } from '../../models/user.model';

type loginData = {
	username: string;
	password: string;
};

export const login = async (req: Request, res: Response) => {
	try {
		const username = (req.body as loginData).username;
		const password = (req.body as loginData).password;

		const user: IUser | null = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ error: 'Invalid username or password' });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ error: 'Invalid username or password' });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		})
	} catch (error) {
		res.status(500).json({
			error: 'Internal Server Error',
		});

		if (error instanceof Error)
			throw new Error(`Login error: ${error.message}`);
	}
};
