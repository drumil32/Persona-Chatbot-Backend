import { NextFunction, Request, Response } from 'express';
import { aiService } from '../services/ai.service';
import { ChatRequest } from '../types';

export const validateChatRequest = (req: Request, res: Response, next: NextFunction) => {
  const { message, model }: ChatRequest = req.body;

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ 
      error: 'Message is required and must be a non-empty string' 
    });
  }

  if (model && !aiService.validateModel(model)) {
    return res.status(400).json({ 
      error: `Unsupported model: ${model}` 
    });
  }

  next();
};

export const validateUserName = (req: Request, res: Response, next: NextFunction) => {
  const { userName } = req.params;
  
  if (!userName || typeof userName !== 'string') {
    return res.status(400).json({ 
      error: 'Username is required' 
    });
  }

  next();
};