import type { Response } from 'express';
import Conversation from '../../models/conversation.model';
import Message from '../../models/message.model';
import type { ProtectRouteRequest } from '../../middleware/protectRoute';

export const sendMessage = async (req: ProtectRouteRequest, res: Response) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user?._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation)
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) conversation.messages.push(newMessage._id);

		await Promise.all([conversation, newMessage]);

		res.status(201).json(newMessage);
	} catch (error) {
		res.status(500).json({
			error: 'Internal Server Error',
		});

		if (error instanceof Error) throw new Error(`Send Message error: ${error.message}`);
	}
};
