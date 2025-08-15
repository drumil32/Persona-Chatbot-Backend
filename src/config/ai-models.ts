import { OpenAI } from 'openai';
import { AIModelKey } from '../types';
import { config } from './environment';

export const modelMappings: Record<AIModelKey, string> = {
  'gemini-2.0-flash': 'gemini-2.0-flash',
  'gpt-4o-mini': 'gpt-4o-mini',
  'deepseek': 'deepseek-chat',
  'claude': 'claude-3-5-haiku-latest',
  'groq-llama': 'llama-3.3-70b-versatile'
};

export const createAIClients = (): Record<AIModelKey, OpenAI> => {
  return {
    'gemini-2.0-flash': new OpenAI({
      apiKey: config.apiKeys.gemini,
      baseURL: config.baseUrls.gemini
    }),
    'gpt-4o-mini': new OpenAI({
      apiKey: config.apiKeys.openai,
      baseURL: config.baseUrls.openai
    }),
    'deepseek': new OpenAI({
      apiKey: config.apiKeys.deepseek,
      baseURL: config.baseUrls.deepseek
    }),
    'claude': new OpenAI({
      apiKey: config.apiKeys.claude,
      baseURL: config.baseUrls.claude
    }),
    'groq-llama': new OpenAI({
      apiKey: config.apiKeys.groq,
      baseURL: config.baseUrls.groq
    })
  };
};