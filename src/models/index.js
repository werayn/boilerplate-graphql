import { Sequelize } from 'sequelize';
import path from 'path';
// Config
import { env } from '@config/env.js';

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
    modelPaths: [path.join(__dirname, '/*.model.ts')],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
});
export { User } from './user.model';
