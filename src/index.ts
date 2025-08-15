import express from 'express';
import cors from 'cors';
import { config } from './config/environment';
import { corsOptions } from './config/cors';
import routes from './routes';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/logging';
import { validateOrigin } from './middleware/origin-validation';
import { logger } from './config/logger';

const app = express();

// Trust proxy to get real IP addresses
app.set('trust proxy', 'loopback');

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(validateOrigin);

app.use('/', routes);

app.use(errorHandler);

app.listen(config.port, () => {
  logger.info('Server started successfully', { 
    port: config.port, 
    environment: process.env.NODE_ENV || 'development',
    corsAllowedOrigins: config.cors.allowedOrigins,
    securityAllowedOrigins: config.security.allowedOrigins,
    timestamp: new Date().toISOString()
  });
});