import express from 'express';
import cors from 'cors';
import { config } from './config/environment';
import routes from './routes';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/logging';
import { logger } from './config/logger';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', routes);

app.use(errorHandler);

app.listen(config.port, () => {
  logger.info('Server started successfully', { 
    port: config.port, 
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});