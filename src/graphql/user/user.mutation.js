/* eslint-disable prefer-const */
import { resolver } from 'graphql-sequelize';
import  { db } from '@models/index.js';
import to from 'await-to-js';
// Tools
import logger from '@tools/logger';

export const Mutation = {
    createUser: resolver(db.User, {
        before: async (findOptions, { data }) => {
            let err;
            let user;
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
