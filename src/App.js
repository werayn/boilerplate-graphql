import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
// Tools
import logger from '@tools/logger';
// Middleware
import { loggerMiddleware } from '@middleware/logger.middleware.js';
// Db
import db from './db';

dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.server = new ApolloServer({
            typeDefs: gql(typeDefs),
            resolvers,
            context: { db },
        });

        this.initializeMiddlewares = this.initializeMiddlewares.bind(this);
        this.initializeMiddlewares();
    }

    listen() {
        db.sequelize.sync().then(() => {
            this.app.listen(process.env.PORT, () => {
                logger.info('/*************** *************** ***************/');
                logger.info('/*************** STARTING SERVER ***************/');
                logger.info('/*************** *************** ***************/');
                logger.info(`🚀 Server ready and listening HTTP on the port ${process.env.PORT}`);
            }).on('error', (err) => {
                logger.error(err);
                process.exit(1);
            });
        }).on('error', (err) => {
            logger.error(err);
            process.exit(1);
        });
    }

    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json({limit: '50mb', extended: true}));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(loggerMiddleware);

        this.server.applyMiddleware( this.app );

    }
}

export { App };
