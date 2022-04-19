import express from 'express';
import logger from './utils/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CORS_ORIGIN } from './constants';
import { connectToDatabase, disconnectFromDatabase } from './utils/database';
import helmet from 'helmet';
import deserializeUser from './middleware/deserializeUser';

import userRoute from './modules/user/user.route';
import authRoute from './modules/auth/auth.route';
import videoRoute from './modules/video/video.route';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		origin: CORS_ORIGIN,
		credentials: true,
	})
);
app.use(helmet());
app.use(deserializeUser);

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/videos', videoRoute);

const server = app.listen(PORT, async () => {
	await connectToDatabase();
	logger.info(`server listing at http://localhost/${PORT}`);
});

const signals = ['SIGTERM', 'SIGINT'];

const gracefulShutdown = (signal: string) => {
	process.on(signal, async () => {
		logger.info(`Goodby got signal ${signal}`);
		server.close();

		await disconnectFromDatabase();

		logger.info('My work here is done');
		process.exit(0);
	});
};

signals.forEach(signal => {
	gracefulShutdown(signal);
});
