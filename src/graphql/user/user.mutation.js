/* eslint-disable prefer-const */
import { resolver } from 'graphql-sequelize';
import  { db } from '@models/index.js';
import to from 'await-to-js';
// Tools
import logger from '@tools/logger';
//Security
import { hashPassword } from '@security/hashPassword.js';

export const Mutation = {
    createUser: resolver(db.User, {
        before: async (findOptions, { data }) => {
            let err;
            let user;
            let password;
            [err, password] = await to(hashPassword(data.password));
            if (err) {
                logger.error(`Mut createUser hash err: ${err}`);
                throw err;
            }
            data.password = password;
            [err, user] = await to(db.User.create(data));
            if (err) {
                logger.error(`Mut createUser err: ${err}`);
                throw err;
            }
            findOptions.where = { id: user.id };
            return findOptions;
        },
        after: (user) => {
            user.login = true;
            return user;
        },
    }),
};
