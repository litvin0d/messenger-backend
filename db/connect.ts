import mongoose from 'mongoose';

export const connectToDatabase = async () => {
	try {
		if (process.env.DB_URI) return await mongoose.connect(process.env.DB_URI);
	} catch (error) {
		if (error instanceof Error) throw new Error(`Could not connect to database: ${error.message}`);
	}
};
