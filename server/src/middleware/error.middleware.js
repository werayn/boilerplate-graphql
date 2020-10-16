const errorMiddleware = (err, req, res, next) => {
    if (res && res.status) {
        const errorObject = { error: true, message: `${err.name}: ${err.message}` };
        if (err.name === 'UnauthorizedError') {
            //      return res.status(401).json(errorObject);
        } else {
            //       return res.status(400).json(errorObject);
        }
    } else {
        next();
    }
    next();

};

export { errorMiddleware };
