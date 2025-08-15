"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRealIP = void 0;
const getRealIP = (req) => {
    return req.get('X-Real-IP') ||
        req.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
        req.ip ||
        req.connection.remoteAddress ||
        'unknown';
};
exports.getRealIP = getRealIP;
//# sourceMappingURL=getIp.js.map