/* eslint-disable no-empty-pattern */
import { resolver } from 'graphql-sequelize';
import { User } from '../../models';
import to from 'await-to-js';
// Tools
import logger from '@tools/logger';

export const Query = {
    getUser: resolver(User, {
        before: async (findOptions, {}, {user}) => {
            findOptions.where = {id: user.id};
            return findOptions;
        },
        after: (user) => {
            return user;
        },
    }),
    loginUser: resolver(User, {
        before: async (findOptions, { username }) => {
            findOptions.where = {username};
            return findOptions;
        },
        after: async (user, { password }) => {
            let err;
            [err, user] = await to(user.comparePassword(password));
            if (err) {
                logger.error(`Error: loginUser: ${err}`);
                throw new Error(err);
            }
            user.login = true;//to let the directive know to that this user is authenticated without an authorization header
            return user;
        },
    }),
};
