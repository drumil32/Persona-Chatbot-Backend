import { Router } from 'express';
import { chatController } from '../controllers/chat.controller';
import { validateChatRequest } from '../middleware/validation';
import { chatRateLimit } from '../middleware/rate-limit';

const router: Router = Router();

router.post('/chat', chatRateLimit, validateChatRequest, chatController);

export default router;