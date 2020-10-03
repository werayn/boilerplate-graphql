import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: process.env.PORT || '3011',
    DB_HOST: process.env.DB_HOST || '192.168.XXX',
    DB_PORT: process.env.DB_PORT || '5432',
    DB_NAME: process.env.DB_NAME || 'XXX',
    DB_USER: process.env.DB_USER || 'XXX',
    DB_PASSWORD: process.env.DB_PASSWORD || 'XXXX',
    DB_DIALECT: process.env.DB_DIALECT || 'postgres',

    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'secureKey',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1y',
};
