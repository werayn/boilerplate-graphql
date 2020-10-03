import { resolver as rs } from 'graphql-sequelize';
import { User } from '@models';
import to from 'await-to-js';
// Tools
import logger from '@tools/logger';

export const Mutation = {
    createUser: rs(User, {
        before: async (findOptions, { data }) => {
            let err = null;
            let user = null;
            [err, user] = await to(User.create(data) );
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
