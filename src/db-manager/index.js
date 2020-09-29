/* eslint-disable camelcase */
import { Pool } from 'pg';
import dotenv from 'dotenv';
import Queries from '@queries/index.js';
import logger from '@tools/logger.js';

dotenv.config();

class DBManager {
    constructor() {
        this.init();
    }
    //Init connection to datbase
    async init(){
        logger.debug('Initializing database connection with %s', JSON.stringify({
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT,
        }));
        this.pool = new Pool({
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT,
        });

        await this.pool.connect();
    }

    runQuery(query, params) {
        return this.pool.query(query, params);
    }
    //Dashboard
    async getStatGlobal() {
        const ret = await this.runQuery(Queries.get('getMetrics'));
        return ret.rows;
    }
    //Auth Users
    async getUser(username) {
        const result = await this.runQuery(Queries.get('getUser'), [username]);
        return result.rows;
    }

    async setUserLogStory(user ) {
        await this.runQuery(Queries.get('setUserLogStory'), [user]);
    }
}

export default new DBManager();
