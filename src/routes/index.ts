import { Router } from 'express';
import chatRoutes from './chat.routes';
import userRoutes from './user.routes';
import generalRoutes from './general.routes';

const router = Router();

router.use('/', generalRoutes);
router.use('/', chatRoutes);
router.use('/api', userRoutes);

export default router;