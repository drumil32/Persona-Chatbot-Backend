"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const environment_1 = require("./environment");
const logger_1 = require("./logger");
exports.corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            logger_1.logger.warn('Request with no origin allowed');
            return callback(null, true);
        }
        if (environment_1.config.cors.allowedOrigins.includes(origin)) {
            logger_1.logger.debug('CORS request allowed', { origin });
            callback(null, true);
        }
        else {
            logger_1.logger.warn('CORS request blocked', { origin, allowedOrigins: environment_1.config.cors.allowedOrigins });
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    maxAge: 86400 // 24 hours
};
//# sourceMappingURL=cors.js.map