import { Request, Response } from 'express';
import { ChatRequest, AIModelKey } from '../types';
import { userService } from '../services/user.service';
import { aiService } from '../services/ai.service';
import { logger } from '../config/logger';

export const chatController = async (req: Request, res: Response) => {
  try {
    const { message, model = 'gemini-2.0-flash', userName = 'User' }: ChatRequest = req.body;

    if (!userService.userExists(userName)) {
      return res.status(400).json({ 
        error: `User ${userName} does not exist` 
      });
    }

    let userData = userService.getUserData(userName);
    userData ??= userService.initializeUser(userName);

    userService.addMessageToUserHistory(userName, 'user', message, model);

    let userSystemPrompt: string;
    try {
      userSystemPrompt = userService.getUserSystemPrompt(userName);
    } catch (error) {
      return res.status(400).json({ 
        error: `Failed to load system prompt for user ${userName}` 
      });
    }

    const aiResponse = await aiService.generateResponse(
      model as AIModelKey, 
      userData, 
      userSystemPrompt
    );

    userService.addMessageToUserHistory(userName, 'assistant', aiResponse, model);

    const updatedUserData = userService.getUserData(userName)!;

    res.json({
      response: aiResponse,
      usedModel: model,
      userName: userName,
      messageCount: updatedUserData.messageCount,
      totalUsers: userService.getTotalUserCount(),
      userCreatedAt: updatedUserData.createdAt,
      lastActiveAt: updatedUserData.lastActiveAt
    });
  } catch (error: any) {
    logger.error('Chat controller error', { 
      error: error.message, 
      stack: error.stack,
      userName: req.body.userName || 'Unknown',
      model: req.body.model || 'Unknown'
    });
    
    res.status(500).json({
      error: 'Failed to process chat request',
      details: error.message
    });
  }
};