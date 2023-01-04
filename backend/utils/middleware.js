const logger = require('./logger');

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("-------");
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message, '|', error.name);
    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'Malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'Token expired', name: error.name });
    }
    // if not any of the above errors, send to Express' default error handling middleware
    next(error);
};

module.exports = {
    requestLogger, unknownEndpoint, errorHandler
};