import {Request} from 'express';

export const getRealIP = (req: Request): string => {
    return req.get('X-Real-IP') || 
           req.get('X-Forwarded-For')?.split(',')[0]?.trim() || 
           req.ip || 
           req.connection.remoteAddress || 
           'unknown';
  };