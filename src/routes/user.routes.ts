import { Router } from 'express';
import { getAllUsers, getUserHistory, clearUserHistory } from '../controllers/user.controller';
import { validateUserName } from '../middleware/validation';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:userName/history', validateUserName, getUserHistory);
router.delete('/users/:userName/history', validateUserName, clearUserHistory);

export default router;