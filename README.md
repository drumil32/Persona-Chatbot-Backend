# AI Persona Chatbot

An AI-powered chatbot that mimics the personas of **Hitesh Choudhary** and **Piyush Garg**. Chat with AI versions of these popular tech educators and get responses in their unique teaching styles.

## 🌐 Live Demo

[**Try it now →**](https://persona.ai.sprintup.in/)

## ✨ Features

- 🤖 **Dual Personas**: Chat with AI versions of Hitesh Choudhary and Piyush Garg
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- 🧠 **Multiple AI Models**: Supports various AI models (Gemini, GPT-4o Mini, DeepSeek, Claude, Groq Llama)
- ⚡ **Real-time Chat**: Instant responses with smooth chat interface
- 🔒 **Advanced Security**: Rate limiting, origin validation, and IP-based protection
- 🛡️ **Attack Prevention**: Multiple layers of security to protect against malicious requests

## 🛠️ Tech Stack

### Frontend

- **Vite** + **TypeScript** + **Tailwind CSS**
- **Package Manager**: npm
- **Hosting**: AWS Amplify

### Backend

- **Node.js** + **Express** + **TypeScript**
- **AI Integration**: Multiple AI providers (OpenAI, Google, Anthropic, DeepSeek, Groq)
- **Security**: Rate limiting, CORS, origin validation
- **Logging**: Winston with file rotation
- **Hosting**: AWS EC2 (t2.micro)
- **Reverse Proxy**: Nginx

## 🔒 Security Features

### Rate Limiting Protection
- **IP-based Rate Limiting**: Prevents abuse by limiting requests per IP address
- **Model-specific Limits**: Different rate limits for different AI models based on cost and performance
- **User + Model Combination**: Rate limiting based on `IP:UserName:Model` keys
- **Automatic Cleanup**: Expired rate limit entries are automatically cleaned up

### Attack Prevention
- **Origin-based Access Control**: Only allows requests from configured frontend domains
- **CORS Protection**: Configurable CORS policies to prevent unauthorized cross-origin requests
- **Request Validation**: Input sanitization and validation to prevent malicious payloads
- **Error Handling**: Secure error responses without sensitive data exposure

### IP-based Protection
- **Request Isolation**: Each IP address maintains independent user data and rate limits
- **Abuse Detection**: Monitoring and logging of suspicious activities
- **Automatic Blocking**: Malicious origins are automatically blocked

## 📂 Repositories

- **Frontend**: [github.com/drumil32/Persona-Chatbot-Frontend](https://github.com/drumil32/Persona-Chatbot-Frontend)

## 🚀 Quick Start

### Backend Setup

```bash
git clone <your-backend-repo-url>
cd backend
npm install
npm run dev
```

### Environment Configuration

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# AI Model API Keys (at least one required)
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
CLAUDE_API_KEY=your_claude_api_key
GROQ_API_KEY=your_groq_api_key

# CORS & Security
FRONTEND_URL_1=http://localhost:3000
FRONTEND_URL_2=https://your-frontend-domain.com
ALLOWED_ORIGIN_1=http://localhost:3000
ALLOWED_ORIGIN_2=https://your-frontend-domain.com

# Rate Limiting (per minute)
RATE_LIMIT_GEMINI_MAX_REQUESTS=15
RATE_LIMIT_GPT_MAX_REQUESTS=8
RATE_LIMIT_DEEPSEEK_MAX_REQUESTS=12
RATE_LIMIT_CLAUDE_MAX_REQUESTS=5
RATE_LIMIT_GROQ_MAX_REQUESTS=20
```

## 🏗️ Architecture

```
Frontend (AWS Amplify) → Backend (AWS EC2 + Nginx) → AI APIs
                     ↗ Rate Limiter → Security Layer → Controllers
```

### Security Flow
```
Request → Origin Validation → Rate Limiting → Input Validation → AI Service → Response
```

## 🤖 Supported AI Models

| Model | Provider | Rate Limit/min | Cost Tier | Use Case |
|-------|----------|----------------|-----------|----------|
| **Gemini 2.0 Flash** | Google | 15 | Low | Fast responses, general queries |
| **GPT-4o Mini** | OpenAI | 8 | Medium | Cost-effective, high quality |
| **DeepSeek** | DeepSeek | 12 | Low | Coding assistance, technical queries |
| **Claude** | Anthropic | 5 | High | Complex reasoning, analysis |
| **Groq Llama** | Groq | 20 | Low | High-speed inference |

## 👥 Personas

- **Hitesh Choudhary**: Tech educator with Hindi-English casual style responses
- **Piyush Garg**: Professional developer with structured teaching approach

## 📊 Rate Limiting Strategy

### Multi-layer Protection
- **IP + User + Model**: Unique rate limit keys for granular control
- **Model-specific Limits**: Higher limits for cheaper/faster models, lower for expensive ones
- **Window-based**: 60-second rolling windows with automatic reset
- **Memory Store**: Fast in-memory rate limiting with periodic cleanup

### Example Rate Limits
```
IP: 192.168.1.1, User: Hitesh, Model: GPT-4o Mini → 8 requests/minute
IP: 192.168.1.1, User: Hitesh, Model: Groq Llama → 20 requests/minute
IP: 192.168.1.2, User: Piyush, Model: Claude → 5 requests/minute
```

## 🛡️ Security Middleware Stack

1. **CORS Protection**: Allows only configured frontend domains
2. **Origin Validation**: Additional layer to validate request origins
3. **Rate Limiting**: Prevents abuse and reduces server load
4. **Input Validation**: Sanitizes and validates all incoming requests
5. **Error Handling**: Secure error responses without data leakage

## 📡 API Endpoints

### POST `/chat`
Main chat endpoint with persona-based responses.

**Request:**
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
  "response": "Namaste! Main bilkul badhiya hun...",
  "usedModel": "gemini-2.0-flash",
  "userName": "Hitesh Choudhary"
}
```

### GET `/api/health`
Health check endpoint for monitoring.

### GET `/api/models`
Lists all available AI models and their configurations.

## 📊 Monitoring & Logging

### Winston Logger Features
- **File Rotation**: Automatic log rotation (10MB max, 5 files)
- **Structured Logging**: JSON format with timestamps
- **Security Events**: Logs blocked requests, rate limit violations
- **Performance Tracking**: Request/response timing and AI model usage

### Log Categories
- HTTP requests and responses
- Rate limiting violations
- Security events (blocked origins, validation failures)
- AI model usage and performance
- System errors and debugging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 👤 Author

**drumil32** - [GitHub](https://github.com/drumil32)

---

*Experience personalized tech education with AI personas of your favorite instructors, protected by enterprise-grade security!*