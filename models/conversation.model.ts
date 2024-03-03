import { Schema, model, Types } from 'mongoose';

export interface IConversation {
	_id: Types.ObjectId;
	participants: Schema.Types.ObjectId;
	messages: Types.ObjectId[];
}

const conversationSchema = new Schema<IConversation>(
	{
		participants: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
		],
		messages: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Message',
				default: [],
			},
		],
	},
	{ timestamps: true },
);

const Conversation = model('Conversation', conversationSchema);

export default Conversation;
