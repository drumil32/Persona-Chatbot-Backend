import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const getAllUsers = (req: Request, res: Response) => {
  const users = userService.getAllUsers();
  res.json({ 
    users, 
    totalUsers: userService.getTotalUserCount() 
  });
};

export const getUserHistory = (req: Request, res: Response) => {
  const { userName } = req.params;

  if (!userService.userExists(userName)) {
    return res.status(400).json({ 
      error: `User ${userName} does not exist` 
    });
  }

  const userData = userService.getUserData(userName);
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
    lastActiveAt: userData.lastActiveAt
  });
};

export const clearUserHistory = (req: Request, res: Response) => {
  const { userName } = req.params;

  if (!userService.userExists(userName)) {
    return res.status(400).json({ 
      error: `User ${userName} does not exist` 
    });
  }

  const userData = userService.getUserData(userName);
  if (!userData) {
    return res.status(404).json({ 
      error: 'User has no chat history to clear' 
    });
  }

  const success = userService.clearUserHistory(userName);
  
  if (success) {
    res.json({ 
      message: `Chat history cleared for ${userName}`, 
      success: true 
    });
  } else {
    res.status(500).json({ 
      error: 'Failed to clear chat history' 
    });
  }
};