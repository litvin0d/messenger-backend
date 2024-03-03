import type { Response } from 'express';

import User from '../../models/user.model';
import type { ProtectRouteRequest } from '../../middleware/protectRoute';

export const getUsers = async (req: ProtectRouteRequest, res: Response) => {
	try {
		const loggedInUserId = req.user?._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

		res.status(200).json(filteredUsers);
	} catch (error) {
		res.status(500).json({
			error: 'Internal Server Error',
		});

		if (error instanceof Error) throw new Error(`Get Users error: ${error.message}`);
	}
};
