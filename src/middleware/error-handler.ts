import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { getRealIP } from '../config/getIp';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Unhandled API Error', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: getRealIP(req),
    statusCode: error.statusCode || 500
  });

  if (error.response) {
    logger.error('External API Response Error', {
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