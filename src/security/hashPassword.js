/* eslint-disable prefer-const */
// Tools
import logger from '@tools/logger';
import bcrypt from 'bcrypt';
import to from 'await-to-js';

export const hashPassword = async (password) => {
    let err;
    let salt, hash;
    [err, salt] = await to(bcrypt.genSalt(10));
    if (err) {
        logger.error(`Err: HashPasword ${err}`);
        throw err;
    }

    [err, hash] = await to(bcrypt.hash(password, salt));
    if (err) {
        logger.error(`Err: HashPasword ${err}`);
        throw err;
    }
    return hash;
};
