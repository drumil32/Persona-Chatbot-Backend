import cors from 'cors';
import { config } from './environment';
import { logger } from './logger';

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      logger.warn('Request with no origin allowed');
      return callback(null, true);
    }

    if (config.cors.allowedOrigins.includes(origin)) {
      logger.debug('CORS request allowed', { origin });
      callback(null, true);
    } else {
      logger.warn('CORS request blocked', { origin, allowedOrigins: config.cors.allowedOrigins });
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400 // 24 hours
};