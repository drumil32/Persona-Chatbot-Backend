"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const environment_1 = require("./config/environment");
const cors_2 = require("./config/cors");
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = require("./middleware/error-handler");
const logging_1 = require("./middleware/logging");
const origin_validation_1 = require("./middleware/origin-validation");
const logger_1 = require("./config/logger");
const app = (0, express_1.default)();
// Trust proxy to get real IP addresses
app.set('trust proxy', 'loopback');
app.use(express_1.default.json());
app.use((0, cors_1.default)(cors_2.corsOptions));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(logging_1.requestLogger);
app.use(origin_validation_1.validateOrigin);
app.use('/', routes_1.default);
app.use(error_handler_1.errorHandler);
app.listen(environment_1.config.port, () => {
    logger_1.logger.info('Server started successfully', {
        port: environment_1.config.port,
        environment: process.env.NODE_ENV || 'development',
        corsAllowedOrigins: environment_1.config.cors.allowedOrigins,
        securityAllowedOrigins: environment_1.config.security.allowedOrigins,
        timestamp: new Date().toISOString()
    });
});
//# sourceMappingURL=index.js.map