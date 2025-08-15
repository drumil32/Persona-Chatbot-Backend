# AI Persona Chat Backend

A sophisticated Node.js/TypeScript backend service that provides multi-model AI chat capabilities with persona-based conversations. This backend supports multiple AI providers, IP-based user isolation, comprehensive logging, rate limiting, and security features.

## 🚀 Overview

The AI Persona Chat Backend is designed to create personalized AI chat experiences by simulating conversations with different personas (like "Hitesh Choudhary" and "Piyush Garg"). Each persona has unique system prompts and conversational styles, providing users with tailored interactions.

### Key Features

- **Multi-AI Model Support**: Integration with 5 different AI providers
- **Persona-Based Conversations**: Pre-configured personas with unique characteristics
- **IP-Based User Isolation**: Independent chat histories for different IP addresses
- **Model-Specific Rate Limiting**: Customizable rate limits per AI model
- **Comprehensive Security**: CORS protection, origin validation, and request filtering
- **Advanced Logging**: Winston-based logging with file storage and rotation
- **Type Safety**: Full TypeScript implementation with strict typing
- **Modular Architecture**: Clean separation of concerns with service-oriented design

## 🤖 Supported AI Models

| Model | Provider | Default Rate Limit | Use Case |
|-------|----------|-------------------|----------|
| **Gemini 2.0 Flash** | Google | 15/min | Fast responses, general queries |
| **GPT-4o Mini** | OpenAI | 8/min | Cost-effective, high quality |
| **Deepseek** | Deepseek | 12/min | Coding assistance, technical queries |
| **Claude** | Anthropic | 5/min | Complex reasoning, analysis |
| **Groq Llama** | Groq | 20/min | High-speed inference |

## 👥 Available Personas

- **Hitesh Choudhary**: Tech educator and YouTuber persona
- **Piyush Garg**: Developer and content creator persona
- *Extensible architecture for adding more personas*

## 🏗 Architecture

```
src/
├── config/           # Configuration modules
│   ├── environment.ts    # Environment variables management
│   ├── ai-models.ts     # AI model configurations
│   ├── cors.ts          # CORS settings
│   ├── logger.ts        # Winston logger setup
│   └── getIp.ts         # IP extraction utilities
├── controllers/      # Request handlers
│   ├── chat.controller.ts    # Chat endpoint logic
│   ├── user.controller.ts    # User management
│   └── general.controller.ts # Health checks, model info
├── middleware/       # Express middleware
│   ├── validation.ts         # Request validation
│   ├── error-handler.ts     # Global error handling
│   ├── logging.ts           # HTTP request logging
│   ├── origin-validation.ts # Origin security check
│   └── rate-limit.ts        # Model-specific rate limiting
├── routes/          # Route definitions
│   ├── chat.routes.ts       # Chat endpoints
│   ├── user.routes.ts       # User endpoints
│   ├── general.routes.ts    # General endpoints
│   └── index.ts            # Route aggregation
├── services/        # Business logic
│   ├── user.service.ts      # User management logic
│   └── ai.service.ts        # AI model interactions
├── types/           # TypeScript interfaces
│   └── index.ts            # Type definitions
├── systemPrompts/   # Persona configurations
│   └── prompts.ts          # Persona system prompts
└── index.ts         # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- AI API keys for the models you want to use

### Installation

1. **Clone and navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file** (see Configuration section below)

5. **Build the project**
   ```bash
   pnpm run build
   ```

6. **Start the development server**
   ```bash
   pnpm run dev
   ```

7. **Or start in production**
   ```bash
   pnpm start
   ```

## ⚙️ Configuration

### Environment Variables

#### Server Configuration
```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

#### AI Model API Keys
```env
# Required: At least one API key
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
CLAUDE_API_KEY=your_claude_api_key
GROQ_API_KEY=your_groq_api_key
```

#### CORS & Security
```env
# Frontend URLs for CORS
FRONTEND_URL_1=http://localhost:3000
FRONTEND_URL_2=http://localhost:3001

# Additional origin validation
ALLOWED_ORIGIN_1=http://localhost:3000
ALLOWED_ORIGIN_2=http://localhost:3001
```

#### Rate Limiting (Model-Specific)
```env
# Default limits (fallback)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10

# Per-model limits (optional)
RATE_LIMIT_GEMINI_MAX_REQUESTS=15
RATE_LIMIT_GPT_MAX_REQUESTS=8
RATE_LIMIT_DEEPSEEK_MAX_REQUESTS=12
RATE_LIMIT_CLAUDE_MAX_REQUESTS=5
RATE_LIMIT_GROQ_MAX_REQUESTS=20
```

## 📡 API Endpoints

### Chat Endpoints

#### POST `/chat`
Start or continue a conversation with an AI persona.

**Request Body:**
```json
{
  "message": "Hello, how are you?",
  "model": "gemini-2.0-flash",
  "userName": "Hitesh Choudhary"
}
```

**Response:**
```json
{
  "response": "Hello! I'm doing great, thanks for asking...",
  "usedModel": "gemini-2.0-flash",
  "userName": "Hitesh Choudhary",
  "messageCount": 1,
  "userCreatedAt": "2024-01-15T10:30:00.000Z",
  "lastActiveAt": "2024-01-15T10:30:00.000Z",
  "clientIP": "192.168.1.1"
}
```

**Rate Limiting:** Model-specific limits apply
**Headers:** Include rate limit information

### General Endpoints

#### GET `/`
Welcome message and server status.

#### GET `/api/health`
Health check endpoint.

#### GET `/api/models`
List all available AI models and their configurations.

### User Management (Currently Disabled)

#### GET `/api/users`
List all users for the current IP.

#### GET `/api/users/:userName/history`
Get chat history for a specific user.

#### DELETE `/api/users/:userName/history`
Clear chat history for a specific user.

## 🔒 Security Features

### Multi-Layer Security
1. **CORS Protection**: Configurable allowed origins
2. **Origin Validation**: Additional origin checking middleware  
3. **Rate Limiting**: IP + User + Model based limiting
4. **Request Validation**: Input sanitization and validation
5. **Error Handling**: Secure error responses without sensitive data exposure

### IP-Based Isolation
- Each IP address maintains independent user maps
- Chat histories are completely isolated between different IP addresses
- Prevents cross-contamination of user data

### Rate Limiting Strategy
- **Granular Control**: `IP:UserName:Model` based keys
- **Model-Specific Limits**: Different limits for different AI models
- **Cost Management**: Lower limits for expensive models
- **Performance Optimization**: Higher limits for faster models

## 📊 Logging

### Winston Logger Features
- **File Logging**: Main logs in `log.txt`, errors in `error.log`
- **Log Rotation**: Automatic file rotation (10MB max, 5 files)
- **Structured Logging**: JSON format with timestamps
- **Development Console**: Colorized console output in development
- **Performance Tracking**: Request/response timing and metrics

### Log Categories
- HTTP request/response logging
- AI model usage and performance
- Rate limiting violations
- Security events (blocked origins, validation failures)
- User activity tracking
- System errors and debugging

## 🔧 Development

### Available Scripts
```bash
# Development with hot reload
pnpm run dev

# Build TypeScript
pnpm run build

# Start production server
pnpm start

# Run tests (when implemented)
pnpm test
```

### Code Quality
- **TypeScript**: Full type safety with strict configuration
- **ESLint**: Code linting and style enforcement
- **Modular Design**: Clean separation of concerns
- **Error Handling**: Comprehensive error management
- **Documentation**: Inline code documentation

### Adding New Personas

1. **Add persona to user service**:
   ```typescript
   // src/services/user.service.ts
   userExists(userName: string): boolean {
     return userName === 'Hitesh Choudhary' || 
            userName === 'Piyush Garg' || 
            userName === 'Your New Persona';
   }
   ```

2. **Add system prompt**:
   ```typescript
   // src/systemPrompts/prompts.ts
   export const yourNewPersona = {
     role: "You are [Persona Name]...",
     // ... persona configuration
   };
   ```

3. **Update prompt service**:
   ```typescript
   getUserSystemPrompt(userName: string): string {
     if (userName === "Your New Persona") {
       return JSON.stringify(yourNewPersona);
     }
     // ... existing logic
   }
   ```

### Adding New AI Models

1. **Update types**:
   ```typescript
   // src/types/index.ts
   export type AIModelKey = 'existing-models' | 'new-model';
   ```

2. **Add model configuration**:
   ```typescript
   // src/config/ai-models.ts
   export const modelMappings: Record<AIModelKey, string> = {
     'new-model': 'actual-api-model-name',
     // ... existing mappings
   };
   ```

3. **Add to client creation**:
   ```typescript
   // src/config/ai-models.ts
   export const createAIClients = (): Record<AIModelKey, OpenAI> => {
     return {
       'new-model': new OpenAI({
         apiKey: config.apiKeys.newModel,
         baseURL: config.baseUrls.newModel
       }),
       // ... existing clients
     };
   };
   ```

## 🐛 Troubleshooting

### Common Issues

1. **Rate Limit Errors**
   - Check your rate limit configuration in `.env`
   - Monitor the `log.txt` file for rate limiting events
   - Adjust model-specific limits as needed

2. **API Key Issues**
   - Ensure all required API keys are set in `.env`
   - Verify API keys are valid and have sufficient quota
   - Check the error logs for specific API errors

3. **CORS Errors**
   - Verify `FRONTEND_URL_*` variables match your frontend URLs
   - Check browser network tab for specific CORS errors
   - Ensure origin validation allows your frontend domain

4. **TypeScript Build Errors**
   - Run `pnpm run build` to see specific errors
   - Check for missing type definitions
   - Ensure all imports are correctly typed

### Debug Mode
Set `LOG_LEVEL=debug` in your `.env` file for detailed logging.

## 📈 Performance Considerations

### Optimization Features
- **Memory Store**: In-memory rate limiting for fast access
- **Automatic Cleanup**: Periodic cleanup of expired rate limit entries
- **Efficient Logging**: Non-blocking file operations
- **Connection Reuse**: Persistent HTTP connections to AI APIs
- **Request Validation**: Early validation to prevent unnecessary processing

### Monitoring
- Monitor `log.txt` for performance metrics
- Track rate limit usage patterns
- Monitor AI model response times
- Watch for memory usage trends

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests (when test suite is implemented)
5. Update documentation
6. Submit a pull request

## 📝 License

[Add your license information here]

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section above
2. Review the logs in `log.txt` and `error.log`
3. Create an issue in the repository
4. Check environment configuration

## 🔄 Changelog

### Current Version
- Multi-model AI support (5 providers)
- IP-based user isolation
- Model-specific rate limiting
- Comprehensive logging with Winston
- Security middleware stack
- TypeScript implementation
- Modular architecture

---

**Built with ❤️ using Node.js, TypeScript, Express, and Winston**