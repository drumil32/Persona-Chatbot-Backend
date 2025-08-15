"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 3000,
    apiKeys: {
        gemini: process.env.GEMINI_API_KEY,
        openai: process.env.OPENAI_API_KEY,
        deepseek: process.env.DEEPSEEK_API_KEY,
        claude: process.env.CLAUDE_API_KEY,
        groq: process.env.GROQ_API_KEY,
    },
    baseUrls: {
        gemini: process.env.GEMINI_BASE_URL,
        openai: 'https://api.openai.com/v1',
        deepseek: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1',
        claude: process.env.CLAUDE_BASE_URL || 'https://api.anthropic.com/v1',
        groq: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
    },
    cors: {
        allowedOrigins: [
            process.env.FRONTEND_URL_1,
            process.env.FRONTEND_URL_2
        ].filter(Boolean), // Remove undefined values
    },
    security: {
        allowedOrigins: [
            process.env.ALLOWED_ORIGIN_1,
            process.env.ALLOWED_ORIGIN_2
        ].filter(Boolean), // Remove undefined values
    }
};
//# sourceMappingURL=environment.js.map