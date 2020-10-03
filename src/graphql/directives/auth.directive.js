/* eslint-disable no-empty-pattern */
/* eslint-disable prefer-const */
import { SchemaDirectiveVisitor, ApolloError } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { User } from '@models/index.js';
import to from 'await-to-js';
// Tools
import logger from '@tools/logger';


export class IsAuthUserDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;//This is confusing javascript syntax here is a link that describes what is going on: https://javascript.info/destructuring-assignment
        field.resolve = async function (...args) {
            let authUser, user;
            [user, {}, {authUser}] = args;
            if ((authUser && authUser.id === user.id) || user.login) {
                const result = await resolve.apply(this, args);
                logger.info(`Login success: ${user}`);
                return result;
            } else {
                logger.error(`You must be the authenticated user to get this information: ${JSON.stringify(user)}`);
                throw new ApolloError('You must be the authenticated user to get this information', 'UNAUTHORIZED');
            }
        };
    }
}

export class IsAuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function(...args) {
            let userInfo;
            [, {}, {user: userInfo}] = args;
            if (!userInfo){
                logger.error('User not auth');
                throw new ApolloError('User not authenticated', 'UNAUTHENTICATED');
            }

            let err, authUser;
            [err, authUser] = await to(User.findOne({where: {id: userInfo.id}}));
            if (!authUser){
                if (err) {
                    logger.error(`User not found: ${JSON.stringify(err)}`);
                }
                logger.error(`User not found: ${JSON.stringify(authUser)}`);
                throw new ApolloError('JWT token received, User not found, and not authenticated', ' UNPROCESSABLE_ENTITY');
            }

            args[2].authUser = authUser;
            logger.info(`User found: ${JSON.stringify(userInfo)}`);
            return resolve.apply(this, args);
        };
    }
}
