import type { Response } from 'express';

import Conversation from '../../models/conversation.model';
import type { ProtectRouteRequest } from '../../middleware/protectRoute';

export const getMessages = async (req: ProtectRouteRequest, res: Response) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user?._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate('messages'); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({
			error: 'Internal Server Error',
		});

		if (error instanceof Error) throw new Error(`Get Messages error: ${error.message}`);
	}
};
