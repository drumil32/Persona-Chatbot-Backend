"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRateLimit = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const environment_1 = require("../config/environment");
const getIp_1 = require("../config/getIp");
const logger_1 = require("../config/logger");
// Custom key generator: IP + userName + model
const createRateLimitKey = (req) => {
    const ip = (0, getIp_1.getRealIP)(req);
    const { userName = 'User', model = 'gemini-2.0-flash' } = req.body;
    return `${ip}:${userName}:${model}`;
};
// Get model-specific rate limit configuration
const getModelRateLimit = (model) => {
    return environment_1.config.rateLimit.models[model] || environment_1.config.rateLimit.default;
};
// Custom rate limit store using Map for simplicity
class MemoryStore {
    constructor() {
        this.hits = new Map();
    }
    incr(key, cb) {
        const now = Date.now();
        // Extract model from key to get model-specific limits
        const model = key.split(':')[2];
        const limits = getModelRateLimit(model);
        const { windowMs, maxRequests } = limits;
        const hit = this.hits.get(key);
        if (!hit || now > hit.resetTime) {
            // New window or expired window
            const resetTime = now + windowMs;
            this.hits.set(key, { count: 1, resetTime, windowMs, maxRequests });
            cb(null, 1, new Date(resetTime));
        }
        else {
            // Within current window
            hit.count += 1;
            this.hits.set(key, hit);
            cb(null, hit.count, new Date(hit.resetTime));
        }
    }
    decrement(key) {
        const hit = this.hits.get(key);
        if (hit && hit.count > 0) {
            hit.count -= 1;
            this.hits.set(key, hit);
        }
    }
    resetKey(key) {
        this.hits.delete(key);
    }
    resetAll() {
        this.hits.clear();
    }
    // Cleanup expired entries periodically
    cleanup() {
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
exports.chatRateLimit = (0, express_rate_limit_1.default)({
    windowMs: environment_1.config.rateLimit.default.windowMs, // Default, but will be overridden per model
    max: (req) => {
        const { model = 'gemini-2.0-flash' } = req.body;
        const limits = getModelRateLimit(model);
        return limits.maxRequests;
    },
    // Custom key generator
    keyGenerator: createRateLimitKey,
    // Custom store
    store: store,
    // Custom handler for rate limit exceeded
    handler: (req, res) => {
        const key = createRateLimitKey(req);
        const { userName = 'User', model = 'gemini-2.0-flash' } = req.body;
        const limits = getModelRateLimit(model);
        logger_1.logger.warn('Rate limit exceeded', {
            key,
            ip: (0, getIp_1.getRealIP)(req),
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
    skipSuccessfulRequests: environment_1.config.rateLimit.skipSuccessfulRequests,
    // Skip failed requests if configured  
    skipFailedRequests: environment_1.config.rateLimit.skipFailedRequests,
    // Custom skip function for additional logic
    skip: (req) => {
        // You can add custom logic here to skip rate limiting for certain conditions
        // For example, skip for admin users, etc.
        return false;
    },
    // Add rate limit info to response headers
    standardHeaders: true,
    legacyHeaders: false
});
//# sourceMappingURL=rate-limit.js.map