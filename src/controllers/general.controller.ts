import { Request, Response } from 'express';
import { aiService } from '../services/ai.service';

export const healthCheck = (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
};

export const getModels = (req: Request, res: Response) => {
  const availableModels = aiService.getAvailableModels();
  res.json({ models: availableModels });
};

export const welcome = (req: Request, res: Response) => {
  res.json({ 
    message: 'Hello World! Backend is running.' 
  });
};