import { OpenAI } from 'openai';
import { createAIClients, modelMappings } from '../config/ai-models';
import { AIModelKey, UserData } from '../types';

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

    console.log(`Using model: ${model} (API model: ${actualModelName}) for user: ${userData.name} (Message #${userData.messageCount})`);
    
    const response = await selectedClient.chat.completions.create({
      messages: apiMessages,
      model: actualModelName,
    });

    return response.choices[0].message.content || '';
  }
}

export const aiService = new AIService();