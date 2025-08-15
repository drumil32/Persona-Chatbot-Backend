"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAIClients = exports.modelMappings = void 0;
const openai_1 = require("openai");
const environment_1 = require("./environment");
exports.modelMappings = {
    'gemini-2.0-flash': 'gemini-2.0-flash',
    'gpt-4o-mini': 'gpt-4o-mini',
    'deepseek': 'deepseek-chat',
    'claude': 'claude-3-5-haiku-latest',
    'groq-llama': 'llama-3.3-70b-versatile'
};
const createAIClients = () => {
    return {
        'gemini-2.0-flash': new openai_1.OpenAI({
            apiKey: environment_1.config.apiKeys.gemini,
            baseURL: environment_1.config.baseUrls.gemini
        }),
        'gpt-4o-mini': new openai_1.OpenAI({
            apiKey: environment_1.config.apiKeys.openai,
            baseURL: environment_1.config.baseUrls.openai
        }),
        'deepseek': new openai_1.OpenAI({
            apiKey: environment_1.config.apiKeys.deepseek,
            baseURL: environment_1.config.baseUrls.deepseek
        }),
        'claude': new openai_1.OpenAI({
            apiKey: environment_1.config.apiKeys.claude,
            baseURL: environment_1.config.baseUrls.claude
        }),
        'groq-llama': new openai_1.OpenAI({
            apiKey: environment_1.config.apiKeys.groq,
            baseURL: environment_1.config.baseUrls.groq
        })
    };
};
exports.createAIClients = createAIClients;
//# sourceMappingURL=ai-models.js.map