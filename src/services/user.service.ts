import fs from 'fs';
import path from 'path';
import { UserData } from '../types';
import { logger } from '../config/logger';

class UserService {
  private userMap: Map<string, UserData> = new Map();

  getUserData(userName: string): UserData | null {
    return this.userMap.get(userName) || null;
  }

  userExists(userName: string): boolean {
    const systemPromptPath = path.join(__dirname, '..', `${userName}.md`);
    return fs.existsSync(systemPromptPath);
  }

  initializeUser(userName: string): UserData {
    if (!this.userExists(userName)) {
      throw new Error(`User ${userName} does not exist`);
    }

    const newUser: UserData = {
      name: userName,
      history: [],
      createdAt: new Date(),
      lastActiveAt: new Date(),
      messageCount: 0
    };
    
    this.userMap.set(userName, newUser);
    logger.info('User initialized', { userName, userId: newUser.name });
    return newUser;
  }

  updateUserActivity(userName: string): void {
    const userData = this.getUserData(userName);
    if (userData) {
      userData.lastActiveAt = new Date();
      this.userMap.set(userName, userData);
    }
  }

  addMessageToUserHistory(
    userName: string, 
    role: 'user' | 'assistant', 
    content: string, 
    model?: string
  ): void {
    const userData = this.getUserData(userName);
    if (userData) {
      userData.history.push({
        role,
        content,
        timestamp: new Date(),
        model
      });
      userData.messageCount++;
      userData.lastActiveAt = new Date();
      this.userMap.set(userName, userData);
      
      logger.debug('Message added to user history', { 
        userName, 
        role, 
        messageCount: userData.messageCount,
        model 
      });
    }
  }

  getAllUsers(): Array<{ name: string; messageCount: number; createdAt: Date; lastActiveAt: Date }> {
    return Array.from(this.userMap.entries()).map(([userName, userData]) => ({
      name: userData.name,
      messageCount: userData.messageCount,
      createdAt: userData.createdAt,
      lastActiveAt: userData.lastActiveAt
    }));
  }

  getTotalUserCount(): number {
    return this.userMap.size;
  }

  clearUserHistory(userName: string): boolean {
    if (!this.userExists(userName)) {
      return false;
    }

    const userData = this.getUserData(userName);
    if (!userData) {
      return false;
    }

    userData.history = [];
    userData.messageCount = 0;
    userData.lastActiveAt = new Date();
    this.userMap.set(userName, userData);

    logger.info('User chat history cleared', { userName, previousMessageCount: userData.messageCount });
    return true;
  }

  getUserSystemPrompt(userName: string): string {
    try {
      const systemPromptPath = path.join(__dirname, '..', `${userName}.json`);
      if (!fs.existsSync(systemPromptPath)) {
        throw new Error(`System prompt file not found for user: ${userName}`);
      }
      return fs.readFileSync(systemPromptPath, 'utf-8');
    } catch (error: any) {
      logger.error('Failed to read system prompt', { userName, error: error.message });
      throw error;
    }
  }
}

export const userService = new UserService();