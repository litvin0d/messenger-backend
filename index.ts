import express from 'express';
import cookieParser from 'cookie-parser';
import type { Express } from 'express';

import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';
import userRoutes from './routes/user.routes.ts';
import { connectToDatabase } from './db/connect.ts';

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
	connectToDatabase().then(() => console.log('Successfully connected to database!'));
	console.log(`Server is up and running on port ${PORT}`);
});
