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
  }
} as const;