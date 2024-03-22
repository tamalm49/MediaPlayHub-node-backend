import mongoose from 'mongoose';
import { Redis } from 'ioredis';
import logger from './utils/logger.js';
const connectDB = async () => {
  try {
    const DbInstance = await mongoose.connect(`${process.env.DATABASEHOST}/${process.env.DBNAME}`);
    logger.info(`Database instance connected to ${DbInstance.connection.host}`);
  } catch (error) {
    throw error;
  }
};

export const RedisClient = new Redis();

export default connectDB;
