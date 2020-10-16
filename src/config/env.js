import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: process.env.PORT || '3011',
    DB_HOST: process.env.DB_HOST || '192.168.xxx.xxx',
    DB_PORT: process.env.DB_PORT || '5432',
    DB_NAME: process.env.DB_NAME || 'xx',
    DB_USER: process.env.DB_USER || 'ghpsj',
    DB_PASSWORD: process.env.DB_PASSWORD || 'xxx',
    DB_DIALECT: process.env.DB_DIALECT || 'postgres',

    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'secureKey',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '15min',
    JWT_REFRESH_ENCRYPTION: process.env.JWT_ENCRYPTION || 'secureKey2',
    JWT_REFRESH_EXPIRATION: process.env.JWT_EXPIRATION || '1d',

};
