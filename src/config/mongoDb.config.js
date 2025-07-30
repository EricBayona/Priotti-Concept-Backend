import mongoose from 'mongoose';
import envsConfig from './envs.config.js';
import { logger } from '../utils/logger.js';


export const connectMongoDB = async () => {
    try {
        await mongoose.connect(envsConfig.MONGO_URL);
        logger.info(`✅ MongoDB connected at ${envsConfig.MONGO_URL}`);
    } catch (error) {
        logger.warn(`❌ Error connecting to MongoDB, ${error}`);
        process.exit(1)

    }
}

