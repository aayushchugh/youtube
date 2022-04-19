import mongoose from 'mongoose';
import logger from './logger';

const DB_CONNECTION_STRING =
	process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/youtube';

export const connectToDatabase = async () => {
	try {
		await mongoose.connect(DB_CONNECTION_STRING);
		logger.info('connected to DB');
	} catch (e) {
		logger.error(e, 'failed to connect to DB');
		process.exit(1);
	}
};

export const disconnectFromDatabase = async () => {
	await mongoose.connection.close();

	logger.info('Disconnected from Database');

	return;
};
