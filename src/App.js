/* eslint-disable prefer-const */
import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import to from 'await-to-js';
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';
import jwt from 'express-jwt';
//graphql
import { sequelize } from '@models';
import { resolver as resolvers, schema, schemaDirectives } from './graphql';
// Tools
import logger from '@tools/logger';
// Middleware
import { loggerMiddleware } from '@middleware/logger.middleware.js';
import { errorMiddleware } from '@middleware/error.middleware.js';
// Config
import { env } from '@config/env.js';

dotenv.config();

const app = express();

class App {
    constructor() {
        this.initializeAppMiddlewares = this.initializeAppMiddlewares.bind(this);
        this.initializeGraphQL = this.initializeGraphQL.bind(this);
        this.initializeAppMiddlewares();
        this.initializeGraphQL(this.app);
    }

    listen() {
        app.listen({ port: env.PORT }, async () => {
            logger.info('/*************** *************** ***************/');
            logger.info('/*************** STARTING SERVER ***************/');
            logger.info('/*************** *************** ***************/');
            logger.info(`🚀 Server ready at http://localhost:${env.PORT}/graphql`);

            let err;
            [err] = await to(sequelize.sync(
                //{force: true}
            ));
            if (err) {
                logger.error(err);
                logger.info('Error: Cannot connect to database');
            } else {
                logger.info(`Connected to database: ${env.DB_NAME}`);
            }
        });
    }

    initializeGraphQL() {
        const server = new ApolloServer({
            typeDefs: schema,
            resolvers,
            schemaDirectives,
            playground: true,
            context: ({ req }) => {
                const nreq = req;
                const user = nreq.user;
                return {
                    [EXPECTED_OPTIONS_KEY]: createContext(sequelize),
                    user: user,
                };
            },
        });
        server.applyMiddleware({ app });
    }

    initializeAppMiddlewares() {
        app.use(loggerMiddleware);
        const jwtMiddleware = jwt({
            secret: env.JWT_ENCRYPTION,
            credentialsRequired: false,
            algorithms: ['RS256'],
        });
        app.use(jwtMiddleware);
        app.use(errorMiddleware);
    }
}

export { App };
