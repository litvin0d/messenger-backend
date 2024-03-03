import { Schema, model, Types } from 'mongoose';

export interface IMessage {
	_id: Types.ObjectId;
	senderId: Schema.Types.ObjectId;
	receiverId: Schema.Types.ObjectId;
	message: string;
}

const messageSchema = new Schema<IMessage>(
	{
		senderId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		receiverId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		// createdAt, updatedAt
	},
	{ timestamps: true },
);

const Message = model('Message', messageSchema);

export default Message;
