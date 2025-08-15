import { Router } from 'express';
import { chatController } from '../controllers/chat.controller';
import { validateChatRequest } from '../middleware/validation';

const router = Router();

router.post('/chat', validateChatRequest, chatController);

export default router;