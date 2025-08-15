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
};
//# sourceMappingURL=environment.d.ts.map