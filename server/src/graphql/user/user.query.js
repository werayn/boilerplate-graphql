/* eslint-disable no-empty-pattern */
import { resolver } from 'graphql-sequelize';
import { ApolloError } from 'apollo-server-express';
import { db } from '@models/index.js';
import to from 'await-to-js';
// Tools
import logger from '@tools/logger';

export const Query = {
    getUser: resolver(db.User, {
        before: async (findOptions, {}, {user}) => {
            findOptions.where = {id: user.id};
            return findOptions;
        },
        after: (user) => {
            return user;
        },
    }),
    loginUser: resolver(db.User, {
        before: async (findOptions, { userName }) => {
            findOptions.where = {userName};
            return findOptions;
        },
        after: async (user, { password }) => {
            let err;
            if (!user) {
                logger.error(`Error: loginUser: ${err}`);
                throw new ApolloError('user not found', 'NOT_FOUND');
            }
            [err, user] = await to(user.comparePassword(password));
            if (err) {
                logger.error(`Error: loginUser: ${err}`);
                throw new ApolloError('invalid password', 'UNAUTHORIZED');
            }
            user.login = true;//to let the directive know to that this user is authenticated without an authorization header
            return user;
        },
    }),
};
