import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import type { Response } from 'express';

const generateTokenAndSetCookie = (userId: mongoose.Schema.Types.userId, res: Response) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: '15d',
	});

	res.cookie('jwt', token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // ms
		httpOnly: true, // prevent XSS attacks
		sameSite: 'strict', // prevent CSRF attacks
		secure: process.env.MODE !== 'development',
	});
};

export default generateTokenAndSetCookie;
