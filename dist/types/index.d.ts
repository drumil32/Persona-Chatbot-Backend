export type AIModelKey = 'gemini-2.0-flash' | 'gpt-4o-mini' | 'deepseek' | 'claude' | 'groq-llama';
export interface UserData {
    name: string;
    history: Array<{
        role: 'user' | 'assistant' | 'system';
        content: string;
        timestamp: Date;
        model?: string;
    }>;
    createdAt: Date;
    lastActiveAt: Date;
    messageCount: number;
}
export interface ChatRequest {
    message: string;
    model?: AIModelKey;
    userName?: string;
}
export interface ChatResponse {
    response: string;
    usedModel: AIModelKey;
    userName: string;
    messageCount: number;
    totalUsers: number;
    userCreatedAt: Date;
    lastActiveAt: Date;
}
export interface ApiResponse<T = any> {
    success?: boolean;
    message?: string;
    data?: T;
    error?: string;
    details?: string;
}
export interface UserSummary {
    name: string;
    messageCount: number;
    createdAt: Date;
    lastActiveAt: Date;
}
export interface ModelInfo {
    id: AIModelKey;
    name: string;
    apiModel: string;
}
//# sourceMappingURL=index.d.ts.map