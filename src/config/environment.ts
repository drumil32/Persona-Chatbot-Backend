import dotenv from 'dotenv';

dotenv.config();

export const config = {
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
    ].filter(Boolean) as string[], // Remove undefined values
  },

  security: {
    allowedOrigins: [
      process.env.ALLOWED_ORIGIN_1,
      process.env.ALLOWED_ORIGIN_2
    ].filter(Boolean) as string[], // Remove undefined values
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute default
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10'), // 10 requests per window default
    skipSuccessfulRequests: process.env.RATE_LIMIT_SKIP_SUCCESSFUL === 'true',
    skipFailedRequests: process.env.RATE_LIMIT_SKIP_FAILED === 'true',
  }
} as const;