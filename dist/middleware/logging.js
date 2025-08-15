"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = require("../config/logger");
const getIp_1 = require("../config/getIp");
const requestLogger = (req, res, next) => {
    const start = Date.now();
    // Log request
    logger_1.logger.info('Incoming request', {
        method: req.method,
        url: req.url,
        userAgent: req.get('User-Agent'),
        ip: (0, getIp_1.getRealIP)(req),
        body: req.method === 'POST' ? { ...req.body, message: req.body.message ? '[TRUNCATED]' : undefined } : undefined
    });
    // Capture original res.json to log response
    const originalJson = res.json;
    res.json = function (body) {
        const duration = Date.now() - start;
        // Log response
        logger_1.logger.info('Request completed', {
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            responseSize: JSON.stringify(body).length
        });
        return originalJson.call(this, body);
    };
    next();
};
exports.requestLogger = requestLogger;
//# sourceMappingURL=logging.js.map