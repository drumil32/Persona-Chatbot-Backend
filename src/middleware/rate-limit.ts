import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { config } from '../config/environment';
import { getRealIP } from '../config/getIp';
import { logger } from '../config/logger';
import { ChatRequest, AIModelKey } from '../types';

// Custom key generator: IP + userName + model
const createRateLimitKey = (req: Request): string => {
  const ip = getRealIP(req);
  const { userName = 'User', model = 'gemini-2.0-flash' }: ChatRequest = req.body;
  return `${ip}:${userName}:${model}`;
};

// Get model-specific rate limit configuration
const getModelRateLimit = (model: AIModelKey) => {
  return config.rateLimit.models[model] || config.rateLimit.default;
};

// Custom rate limit store using Map for simplicity
class MemoryStore {
  private hits: Map<string, { count: number; resetTime: number; windowMs: number; maxRequests: number }> = new Map();

  incr(key: string, cb: (error: any, current?: number, resetTime?: Date) => void): void {
    const now = Date.now();
    
    // Extract model from key to get model-specific limits
    const model = key.split(':')[2] as AIModelKey;
    const limits = getModelRateLimit(model);
    const { windowMs, maxRequests } = limits;
    
    const hit = this.hits.get(key);
    
    if (!hit || now > hit.resetTime) {
      // New window or expired window
      const resetTime = now + windowMs;
      this.hits.set(key, { count: 1, resetTime, windowMs, maxRequests });
      cb(null, 1, new Date(resetTime));
    } else {
      // Within current window
      hit.count += 1;
      this.hits.set(key, hit);
      cb(null, hit.count, new Date(hit.resetTime));
    }
  }

  decrement(key: string): void {
    const hit = this.hits.get(key);
    if (hit && hit.count > 0) {
      hit.count -= 1;
      this.hits.set(key, hit);
    }
  }

  resetKey(key: string): void {
    this.hits.delete(key);
  }

  resetAll(): void {
    this.hits.clear();
  }

  // Cleanup expired entries periodically
  cleanup(): void {
    const now = Date.now();
    for (const [key, hit] of this.hits.entries()) {
      if (now > hit.resetTime) {
        this.hits.delete(key);
      }
    }
  }
}

const store = new MemoryStore();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  store.cleanup();
}, 5 * 60 * 1000);

export const chatRateLimit = rateLimit({
  windowMs: config.rateLimit.default.windowMs, // Default, but will be overridden per model
  max: (req: Request) => {
    const { model = 'gemini-2.0-flash' }: ChatRequest = req.body;
    const limits = getModelRateLimit(model as AIModelKey);
    return limits.maxRequests;
  },
  
  // Custom key generator
  keyGenerator: createRateLimitKey,
  
  // Custom store
  store: store as any,
  
  // Custom handler for rate limit exceeded
  handler: (req: Request, res: Response) => {
    const key = createRateLimitKey(req);
    const { userName = 'User', model = 'gemini-2.0-flash' }: ChatRequest = req.body;
    const limits = getModelRateLimit(model as AIModelKey);
    
    logger.warn('Rate limit exceeded', {
      key,
      ip: getRealIP(req),
      userName,
      model,
      limit: limits.maxRequests,
      windowMs: limits.windowMs,
      userAgent: req.get('User-Agent')
    });

    res.status(429).json({
      error: 'Too Many Requests',
      message: `Rate limit exceeded for ${userName} using ${model}. Please try again later.`,
      retryAfter: Math.ceil(limits.windowMs / 1000),
      limit: limits.maxRequests,
      windowMs: limits.windowMs,
      model: model
    });
  },

  // Skip successful requests if configured
  skipSuccessfulRequests: config.rateLimit.skipSuccessfulRequests,
  
  // Skip failed requests if configured  
  skipFailedRequests: config.rateLimit.skipFailedRequests,

  // Custom skip function for additional logic
  skip: (req: Request) => {
    // You can add custom logic here to skip rate limiting for certain conditions
    // For example, skip for admin users, etc.
    return false;
  },

  // Add rate limit info to response headers
  standardHeaders: true,
  legacyHeaders: false
});