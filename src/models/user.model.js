import Sequelize, { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import to from 'await-to-js';
//Config
import { env } from '@config/env.js';
// Tools
import logger from '@tools/logger';

class User extends Sequelize.Model {
    static async hashPassword(user) {
        let err;
        if (user.changed('password')){
            let salt, hash;
            [err, salt] = await to(bcrypt.genSalt(10));
            if (err) {
                logger.error(`Err: HashPasword ${err}`);
                throw err;
            }

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if (err) {
                logger.error(`Err: HashPasword ${err}`);
                throw err;
            }
            user.password = hash;
        }
    }

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
        return 'Bearer ' + jsonwebtoken.sign({
            id: this.id,
        }, env.JWT_ENCRYPTION, { expiresIn: env.JWT_EXPIRATION });
    }
}

const schema = {
    userId: {
        type: DataTypes.INTEGER,
    },
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
