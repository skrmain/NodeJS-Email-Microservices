import { config } from 'dotenv';
config();

export const {
    NODE_ENV = 'development',
    SERVICE_NAME = 'node-examples',
    LOG_LEVEL = 'SILLY',
    MONGODB_URI = 'mongodb://admin:admin@localhost:27017/',
    REDIS_URL,
} = process.env;
