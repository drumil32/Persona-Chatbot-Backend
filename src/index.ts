import express from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Define model types
type AIModelKey = 'gemini-2.0-flash' | 'gpt-4o-mini' | 'deepseek' | 'claude' | 'groq-llama';

// AI Model Clients
const clients: Record<AIModelKey, OpenAI> = {
  'gemini-2.0-flash': new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: process.env.GEMINI_BASE_URL
  }),
  'gpt-4o-mini': new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.openai.com/v1'
  }),
  'deepseek': new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1'
  }),
  'claude': new OpenAI({
    apiKey: process.env.CLAUDE_API_KEY,
    baseURL: process.env.CLAUDE_BASE_URL || 'https://api.anthropic.com/v1'
  }),
  'groq-llama': new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1'
  })
};

// Model name mappings for API calls
const modelMappings = {
  'gemini-2.0-flash': 'gemini-2.0-flash',
  'gpt-4o-mini': 'gpt-4o-mini',
  'deepseek': 'deepseek-chat',
  'claude': 'claude-3-5-haiku-latest',
  'groq-llama': 'llama-3.3-70b-versatile'
};

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello World! Backend is running.' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/models', (req, res) => {
  const availableModels = Object.keys(clients).map((model: string) => ({
    id: model as AIModelKey,
    name: model,
    apiModel: modelMappings[model as AIModelKey]
  }));
  res.json({ models: availableModels });
});

// Get all users
app.get('/api/users', (req, res) => {
  const users = Array.from(userMap.entries()).map(([userName, userData]) => ({
    name: userData.name,
    messageCount: userData.messageCount,
    createdAt: userData.createdAt,
    lastActiveAt: userData.lastActiveAt
  }));
  res.json({ users, totalUsers: userMap.size });
});

// Get specific user's chat history
app.get('/api/users/:userName/history', (req, res) => {
  const { userName } = req.params;

  if (!userExists(userName)) {
    return res.status(400).json({ error: `User ${userName} does not exist` });
  }

  const userData = getUserData(userName);
  if (!userData) {
    return res.status(404).json({ error: 'User has no chat history yet' });
  }

  res.json({
    userName: userData.name,
    history: userData.history,
    messageCount: userData.messageCount,
    createdAt: userData.createdAt,
    lastActiveAt: userData.lastActiveAt
  });
});

// Clear user's chat history
app.delete('/api/users/:userName/history', (req, res) => {
  const { userName } = req.params;

  if (!userExists(userName)) {
    return res.status(400).json({ error: `User ${userName} does not exist` });
  }

  const userData = getUserData(userName);
  if (!userData) {
    return res.status(404).json({ error: 'User has no chat history to clear' });
  }

  userData.history = [];
  userData.messageCount = 0;
  userData.lastActiveAt = new Date();
  userMap.set(userName, userData);

  console.log(`Cleared chat history for user: ${userName}`);
  res.json({ message: `Chat history cleared for ${userName}`, success: true });
});

// Helper function to get user-specific system prompt
const getUserSystemPrompt = (userName: string): string => {
  try {
    const systemPromptPath = path.join(__dirname, `${userName}.json`);
    if (!fs.existsSync(systemPromptPath)) {
      throw new Error(`System prompt file not found for user: ${userName}`);
    }
    return fs.readFileSync(systemPromptPath, 'utf-8');
  } catch (error: any) {
    console.error(`Error reading system prompt for ${userName}:`, error.message);
    throw error;
  }
};

// User data structure
interface UserData {
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

// Store user data with structured history
const userMap: Map<string, UserData> = new Map();

// Helper functions for user management
const getUserData = (userName: string): UserData | null => {
  return userMap.get(userName) || null;
};

const userExists = (userName: string): boolean => {
  // Check if user has a system prompt file
  const systemPromptPath = path.join(__dirname, `${userName}.md`);
  return fs.existsSync(systemPromptPath);
};

const initializeUser = (userName: string): UserData => {
  if (!userExists(userName)) {
    throw new Error(`User ${userName} does not exist`);
  }

  const newUser: UserData = {
    name: userName,
    history: [],
    createdAt: new Date(),
    lastActiveAt: new Date(),
    messageCount: 0
  };
  userMap.set(userName, newUser);
  console.log(`Initialized user: ${userName}`);
  return newUser;
};

const updateUserActivity = (userName: string): void => {
  const userData = getUserData(userName);
  if (userData) {
    userData.lastActiveAt = new Date();
    userMap.set(userName, userData);
  }
};

const addMessageToUserHistory = (userName: string, role: 'user' | 'assistant', content: string, model?: string): void => {
  const userData = getUserData(userName);
  if (userData) {
    userData.history.push({
      role,
      content,
      timestamp: new Date(),
      model
    });
    userData.messageCount++;
    userData.lastActiveAt = new Date();
    userMap.set(userName, userData);
  }
};

app.post('/chat', async (req, res) => {
  try {
    const { message, model = 'gemini-2.0-flash', userName = 'User' } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required and must be a non-empty string' });
    }

    // Validate model
    if (!(model in clients)) {
      return res.status(400).json({ error: `Unsupported model: ${model}` });
    }

    // Check if user exists
    if (!userExists(userName)) {
      return res.status(400).json({ error: `User ${userName} does not exist` });
    }

    // Get user data or initialize if first time
    let userData = getUserData(userName);
    userData ??= initializeUser(userName);

    // Add user message to history
    addMessageToUserHistory(userName, 'user', message, model);

    // Get user-specific system prompt
    let userSystemPrompt;
    try {
      userSystemPrompt = getUserSystemPrompt(userName);
    } catch (error) {
      return res.status(400).json({ error: `Failed to load system prompt for user ${userName}` });
    }

    const systemMessage = {
      role: "system" as const,
      content: userSystemPrompt
    };

    // Prepare messages for API (convert to API format)
    const apiMessages = [
      systemMessage,
      ...userData.history.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Get the appropriate client and model name, with proper typing
    const selectedClient = clients[model as keyof typeof clients];
    const actualModelName = modelMappings[model as keyof typeof modelMappings];

    console.log(`Using model: ${model} (API model: ${actualModelName}) for user: ${userName} (Message #${userData.messageCount})`);
    const response = await selectedClient.chat.completions.create({
      messages: apiMessages,
      model: actualModelName,
    });

    const aiMessage = response.choices[0].message.content;

    // Add AI response to history
    addMessageToUserHistory(userName, 'assistant', aiMessage ?? '', model);

    // Get updated user data for response
    const updatedUserData = getUserData(userName)!;

    res.json({
      response: aiMessage,
      usedModel: model,
      userName: userName,
      messageCount: updatedUserData.messageCount,
      totalUsers: userMap.size,
      userCreatedAt: updatedUserData.createdAt,
      lastActiveAt: updatedUserData.lastActiveAt
    });
  } catch (error: any) {
    console.error('Chat API error:', error);

    // More detailed error handling
    if (error.response) {
      console.error('API Response Error:', error.response.status, error.response.data);
    }

    res.status(500).json({
      error: 'Failed to process chat request',
      details: error.message
    });
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});