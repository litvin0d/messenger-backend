import mongoose from 'mongoose';

export const connectToDatabase = async () => {
	try {
		await mongoose.connect(process.env.DB_URI);
	} catch (error) {
		throw new Error(`Could not connect to database: ${error.message}`);
	}
};
