import { Request, Response, NextFunction } from 'express';
import { config } from '../config/environment';
import { logger } from '../config/logger';
import { getRealIP } from '../config/getIp';

export const validateOrigin = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.get('Origin') || req.get('Referer');
  
  // Skip validation for requests without origin (like direct API calls)
  if (!origin) {
    logger.debug('Request without origin header - allowing');
    return next();
  }
  
  // Extract the origin from referer if needed
  const requestOrigin = origin.includes('://') ? new URL(origin).origin : origin;
  
  if (config.security.allowedOrigins.length === 0) {
    logger.warn('No allowed origins configured - allowing all requests');
    return next();
  }

  if (config.security.allowedOrigins.includes(requestOrigin)) {
    logger.debug('Origin validation passed', { 
      origin: requestOrigin,
      method: req.method,
      path: req.path 
    });
    return next();
  }

  logger.error('Origin validation failed - request blocked', {
    origin: requestOrigin,
    allowedOrigins: config.security.allowedOrigins,
    method: req.method,
    path: req.path,
    userAgent: req.get('User-Agent'),
    ip: getRealIP(req),
  });

  return res.status(403).json({
    error: 'Forbidden',
    message: 'Origin not allowed'
  });
};