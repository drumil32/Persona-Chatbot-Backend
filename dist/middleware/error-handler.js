"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../config/logger");
const getIp_1 = require("../config/getIp");
const errorHandler = (error, req, res, next) => {
    logger_1.logger.error('Unhandled API Error', {
        error: error.message,
        stack: error.stack,
        method: req.method,
        url: req.url,
        userAgent: req.get('User-Agent'),
        ip: (0, getIp_1.getRealIP)(req),
        statusCode: error.statusCode || 500
    });
    if (error.response) {
        logger_1.logger.error('External API Response Error', {
            status: error.response.status,
            data: error.response.data,
            url: req.url
        });
    }
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({
        error: message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map