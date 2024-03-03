import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

import User, { type IUser } from '../models/user.model.js';

export interface ProtectRouteRequest extends Request {
	user?: IUser;
	cookies: {
		jwt?: string;
	};
}

const protectRoute = async (req: ProtectRouteRequest, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.jwt;

		if (!token) return res.status(401).json({ error: 'Unauthorized - No Token Provided' });

		if (!process.env.JWT_SECRET) return console.error('No JWT Secret found in .env');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded || typeof decoded === 'string')
			return res.status(401).json({ error: 'Unauthorized - Invalid Token' });

		const user = await User.findById((decoded as JwtPayload).userId).select('-password');

		if (!user) return res.status(404).json({ error: 'User not found' });

		req.user = user as IUser;

		next();
	} catch (error) {
		res.status(500).json({
			error: 'Internal Server Error',
		});

		if (error instanceof Error) throw new Error(`Send Message error: ${error.message}`);
	}
};

export default protectRoute;
