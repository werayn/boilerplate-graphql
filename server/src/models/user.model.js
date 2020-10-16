import Sequelize, { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import to from 'await-to-js';
//Config
import { env } from '@config/env.js';
// Tools
import logger from '@tools/logger';

class User extends Sequelize.Model {
    async comparePassword(pw) {
        let err = null;
        let pass = null;
        if (!this.password) {
            logger.error('Err: comparePasword no pass');
            throw new Error('Does not have password');
        }
        [err, pass] = await to(bcrypt.compare(pw, this.password));
        if (err) {
            throw err;
        }

        if (!pass) {
            logger.error('Err: invalid pass');
            throw 'Invalid password';
        }

        return this;
    }

    getJwt(){
        return {
            accessToken: 'Bearer ' + jsonwebtoken.sign({
                id: this.id,
            }, env.JWT_ENCRYPTION, { expiresIn: env.JWT_EXPIRATION }),
            refreshToken: 'Bearer ' + jsonwebtoken.sign({
                id: this.id,
            }, env.JWT_REFRESH_ENCRYPTION, { expiresIn: env.JWT_REFRESH_EXPIRATION }),
        };
    }
}

const schema = {
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};

export { User, schema };
