import { AIModelKey, UserData } from '../types';
declare class AIService {
    private clients;
    constructor();
    validateModel(model: string): model is AIModelKey;
    getAvailableModels(): {
        id: AIModelKey;
        name: string;
        apiModel: string;
    }[];
    generateResponse(model: AIModelKey, userData: UserData, systemPrompt: string): Promise<string>;
}
export declare const aiService: AIService;
export {};
//# sourceMappingURL=ai.service.d.ts.map