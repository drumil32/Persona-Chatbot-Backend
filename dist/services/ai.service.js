"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiService = void 0;
const ai_models_1 = require("../config/ai-models");
const logger_1 = require("../config/logger");
class AIService {
    constructor() {
        this.clients = (0, ai_models_1.createAIClients)();
    }
    validateModel(model) {
        return model in this.clients;
    }
    getAvailableModels() {
        return Object.keys(this.clients).map((model) => ({
            id: model,
            name: model,
            apiModel: ai_models_1.modelMappings[model]
        }));
    }
    async generateResponse(model, userData, systemPrompt) {
        const systemMessage = {
            role: "system",
            content: systemPrompt
        };
        const apiMessages = [
            systemMessage,
            ...userData.history.map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        ];
        const selectedClient = this.clients[model];
        const actualModelName = ai_models_1.modelMappings[model];
        logger_1.logger.info('AI request started', {
            model,
            actualModelName,
            userName: userData.name,
            messageCount: userData.messageCount,
            messageHistoryLength: userData.history.length
        });
        const startTime = Date.now();
        const response = await selectedClient.chat.completions.create({
            messages: apiMessages,
            model: actualModelName,
        });
        const duration = Date.now() - startTime;
        const responseContent = response.choices[0].message.content || '';
        logger_1.logger.info('AI response received', {
            model,
            userName: userData.name,
            responseLength: responseContent.length,
            duration: `${duration}ms`,
            tokensUsed: response.usage?.total_tokens || 'unknown'
        });
        return responseContent;
    }
}
exports.aiService = new AIService();
//# sourceMappingURL=ai.service.js.map