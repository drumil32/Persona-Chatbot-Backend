import fs from 'fs';
import path from 'path';
import { UserData } from '../types';
import { logger } from '../config/logger';
import {hiteshChoudhary} from '../systemPrompts/prompts';

class UserService {
  // IP -> (UserName -> UserData)
  private readonly ipUserMaps: Map<string, Map<string, UserData>> = new Map();

  private getUserMapForIP(ip: string): Map<string, UserData> {
    if (!this.ipUserMaps.has(ip)) {
      this.ipUserMaps.set(ip, new Map());
      logger.debug('Created new user map for IP', { ip });
    }
    return this.ipUserMaps.get(ip)!;
  }

  getUserData(userName: string, ip: string): UserData | null {
    const userMap = this.getUserMapForIP(ip);
    return userMap.get(userName) || null;
  }

  userExists(userName: string): boolean {
    return userName=='Hitesh Choudhary' || userName=='Piyush Garg';
  }

  initializeUser(userName: string, ip: string): UserData {
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
    
    const userMap = this.getUserMapForIP(ip);
    userMap.set(userName, newUser);
    logger.info('User initialized', { userName, userId: newUser.name, ip });
    return newUser;
  }

  updateUserActivity(userName: string, ip: string): void {
    const userData = this.getUserData(userName, ip);
    if (userData) {
      userData.lastActiveAt = new Date();
      const userMap = this.getUserMapForIP(ip);
      userMap.set(userName, userData);
    }
  }

  addMessageToUserHistory(
    userName: string, 
    role: 'user' | 'assistant', 
    content: string, 
    ip: string,
    model?: string
  ): void {
    const userData = this.getUserData(userName, ip);
    if (userData) {
      userData.history.push({
        role,
        content,
        timestamp: new Date(),
        model
      });
      userData.messageCount++;
      userData.lastActiveAt = new Date();
      const userMap = this.getUserMapForIP(ip);
      userMap.set(userName, userData);
      
      logger.debug('Message added to user history', { 
        userName, 
        role, 
        messageCount: userData.messageCount,
        model,
        ip 
      });
    }
  }

  getAllUsers(ip: string): Array<{ name: string; messageCount: number; createdAt: Date; lastActiveAt: Date }> {
    const userMap = this.getUserMapForIP(ip);
    return Array.from(userMap.entries()).map(([userName, userData]) => ({
      name: userData.name,
      messageCount: userData.messageCount,
      createdAt: userData.createdAt,
      lastActiveAt: userData.lastActiveAt
    }));
  }

  getTotalUserCount(ip: string): number {
    const userMap = this.getUserMapForIP(ip);
    return userMap.size;
  }

  getTotalIPCount(): number {
    return this.ipUserMaps.size;
  }

  clearUserHistory(userName: string, ip: string): boolean {
    if (!this.userExists(userName)) {
      return false;
    }

    const userData = this.getUserData(userName, ip);
    if (!userData) {
      return false;
    }

    const previousMessageCount = userData.messageCount;
    userData.history = [];
    userData.messageCount = 0;
    userData.lastActiveAt = new Date();
    const userMap = this.getUserMapForIP(ip);
    userMap.set(userName, userData);

    logger.info('User chat history cleared', { userName, previousMessageCount, ip });
    return true;
  }

  getUserSystemPrompt(userName: string): string {
    if( userName=="Hitesh Choudhary" ){
      return JSON.stringify(hiteshChoudhary);
    }else{
      return '';
    }
    // try {
    //   const systemPromptPath = path.join(__dirname, '../systemPrompts', `${userName}.json`);
    //   if (!fs.existsSync(systemPromptPath)) {
    //     throw new Error(`System prompt file not found for user: ${userName}`);
    //   }
    //   return fs.readFileSync(systemPromptPath, 'utf-8');
    // } catch (error: any) {
    //   logger.error('Failed to read system prompt', { userName, error: error.message });
    //   throw error;
    // }
  }
}

export const userService = new UserService();