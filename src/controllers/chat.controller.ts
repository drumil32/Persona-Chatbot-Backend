import { Request, Response } from 'express';
import { getRealIP } from '../config/getIp';
import { logger } from '../config/logger';
import { aiService } from '../services/ai.service';
import { userService } from '../services/user.service';
import { ChatRequest } from '../types';

export const chatController = async (req: Request, res: Response) => {
  try {
    const { message, model = 'gemini-2.0-flash', userName = 'User' }: ChatRequest = req.body;
    const clientIP = getRealIP(req);

    if (!userService.userExists(userName)) {
      return res.status(400).json({
        error: `User ${userName} does not exist`
      });
    }

    let userData = userService.getUserData(userName, clientIP);
    userData ??= userService.initializeUser(userName, clientIP);

    userService.addMessageToUserHistory(userName, 'user', message, clientIP, model);

    let userSystemPrompt: string;

    userSystemPrompt = userService.getUserSystemPrompt(userName);

    const aiResponse = await aiService.generateResponse(
      model,
      userData,
      userSystemPrompt
    );

    userService.addMessageToUserHistory(userName, 'assistant', aiResponse, clientIP, model);

    const updatedUserData = userService.getUserData(userName, clientIP)!;

    res.json({
      response: aiResponse,
      usedModel: model,
      userName: userName,
      messageCount: updatedUserData.messageCount,
      // totalUsers: userService.getTotalUserCount(clientIP),
      // totalIPs: userService.getTotalIPCount(),
      userCreatedAt: updatedUserData.createdAt,
      lastActiveAt: updatedUserData.lastActiveAt,
      clientIP: clientIP
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