import logger from '../tools/logger';

const loggerMiddleware = (req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
};

export { loggerMiddleware };
