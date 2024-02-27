import express from 'express';
import type { Express } from 'express';

import authRoutes from './routes/auth.routes';
import { connectToDatabase } from './db/connect.ts';

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
	connectToDatabase().then(() => console.log('Successfully connected to database!'));
	console.log(`Server is up and running on port ${PORT}`);
});
