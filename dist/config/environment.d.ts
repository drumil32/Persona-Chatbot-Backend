export declare const config: {
    readonly port: string | 3000;
    readonly apiKeys: {
        readonly gemini: string | undefined;
        readonly openai: string | undefined;
        readonly deepseek: string | undefined;
        readonly claude: string | undefined;
        readonly groq: string | undefined;
    };
    readonly baseUrls: {
        readonly gemini: string | undefined;
        readonly openai: "https://api.openai.com/v1";
        readonly deepseek: string;
        readonly claude: string;
        readonly groq: string;
    };
    readonly cors: {
        readonly allowedOrigins: string[];
    };
    readonly security: {
        readonly allowedOrigins: string[];
    };
    readonly rateLimit: {
        readonly default: {
            readonly windowMs: number;
            readonly maxRequests: number;
        };
        readonly models: {
            readonly 'gemini-2.0-flash': {
                readonly windowMs: number;
                readonly maxRequests: number;
            };
            readonly 'gpt-4o-mini': {
                readonly windowMs: number;
                readonly maxRequests: number;
            };
            readonly deepseek: {
                readonly windowMs: number;
                readonly maxRequests: number;
            };
            readonly claude: {
                readonly windowMs: number;
                readonly maxRequests: number;
            };
            readonly 'groq-llama': {
                readonly windowMs: number;
                readonly maxRequests: number;
            };
        };
        readonly skipSuccessfulRequests: boolean;
        readonly skipFailedRequests: boolean;
    };
};
//# sourceMappingURL=environment.d.ts.map