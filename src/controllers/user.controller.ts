import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { getRealIP } from '../config/getIp';

export const getAllUsers = (req: Request, res: Response) => {
  const clientIP = getRealIP(req);
  const users = userService.getAllUsers(clientIP);
  res.json({ 
    users, 
    totalUsers: userService.getTotalUserCount(clientIP),
    totalIPs: userService.getTotalIPCount(),
    clientIP: clientIP
  });
};

export const getUserHistory = (req: Request, res: Response) => {
  const { userName } = req.params;
  const clientIP = getRealIP(req);

  if (!userService.userExists(userName)) {
    return res.status(400).json({ 
      error: `User ${userName} does not exist` 
    });
  }

  const userData = userService.getUserData(userName, clientIP);
  if (!userData) {
    return res.status(404).json({ 
      error: 'User has no chat history yet' 
    });
  }

  res.json({
    userName: userData.name,
    history: userData.history,
    messageCount: userData.messageCount,
    createdAt: userData.createdAt,
    lastActiveAt: userData.lastActiveAt,
    clientIP: clientIP
  });
};

export const clearUserHistory = (req: Request, res: Response) => {
  const { userName } = req.params;
  const clientIP = getRealIP(req);

  if (!userService.userExists(userName)) {
    return res.status(400).json({ 
      error: `User ${userName} does not exist` 
    });
  }

  const userData = userService.getUserData(userName, clientIP);
  if (!userData) {
    return res.status(404).json({ 
      error: 'User has no chat history to clear' 
    });
  }

  const success = userService.clearUserHistory(userName, clientIP);
  
  if (success) {
    res.json({ 
      message: `Chat history cleared for ${userName}`, 
      success: true,
      clientIP: clientIP
    });
  } else {
    res.status(500).json({ 
      error: 'Failed to clear chat history' 
    });
  }
};