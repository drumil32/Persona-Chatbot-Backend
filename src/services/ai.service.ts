import { OpenAI } from 'openai';
import { createAIClients, modelMappings } from '../config/ai-models';
import { AIModelKey, UserData } from '../types';
import { logger } from '../config/logger';

class AIService {
  private clients: Record<AIModelKey, OpenAI>;

  constructor() {
    this.clients = createAIClients();
  }

  validateModel(model: string): model is AIModelKey {
    return model in this.clients;
  }

  getAvailableModels() {
    return Object.keys(this.clients).map((model: string) => ({
      id: model as AIModelKey,
      name: model,
      apiModel: modelMappings[model as AIModelKey]
    }));
  }

  async generateResponse(
    model: AIModelKey,
    userData: UserData,
    systemPrompt: string
  ): Promise<string> {
    const systemMessage = {
      role: "system" as const,
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
    const actualModelName = modelMappings[model];

    logger.info('AI request started', { 
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
    
    logger.info('AI response received', { 
      model, 
      userName: userData.name, 
      responseLength: responseContent.length,
      duration: `${duration}ms`,
      tokensUsed: response.usage?.total_tokens || 'unknown'
    });

    return responseContent;
  }
}

export const aiService = new AIService();