import Sequelize from 'sequelize';
// Config
import { env } from '@config/env.js';
import { User, schema } from './user.model.js';

export const sequelize = new Sequelize({
    host: env.DB_HOST,
    database: env.DB_NAME,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    operatorsAliases: '0',
    logging: false,
    storage: ':memory:',
});

const models = {
    User: User.init(schema, {sequelize, tableName: 'app_user'}),
};

export const db = {
    ...models,
    sequelize,
};
