"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrigin = void 0;
const environment_1 = require("../config/environment");
const logger_1 = require("../config/logger");
const getIp_1 = require("../config/getIp");
const validateOrigin = (req, res, next) => {
    const origin = req.get('Origin') || req.get('Referer');
    // Skip validation for requests without origin (like direct API calls)
    if (!origin) {
        logger_1.logger.debug('Request without origin header - allowing');
        return next();
    }
    // Extract the origin from referer if needed
    const requestOrigin = origin.includes('://') ? new URL(origin).origin : origin;
    if (environment_1.config.security.allowedOrigins.length === 0) {
        logger_1.logger.warn('No allowed origins configured - allowing all requests');
        return next();
    }
    if (environment_1.config.security.allowedOrigins.includes(requestOrigin)) {
        logger_1.logger.debug('Origin validation passed', {
            origin: requestOrigin,
            method: req.method,
            path: req.path
        });
        return next();
    }
    logger_1.logger.error('Origin validation failed - request blocked', {
        origin: requestOrigin,
        allowedOrigins: environment_1.config.security.allowedOrigins,
        method: req.method,
        path: req.path,
        userAgent: req.get('User-Agent'),
        ip: (0, getIp_1.getRealIP)(req),
    });
    return res.status(403).json({
        error: 'Forbidden',
        message: 'Origin not allowed'
    });
};
exports.validateOrigin = validateOrigin;
//# sourceMappingURL=origin-validation.js.map