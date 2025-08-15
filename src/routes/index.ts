import { Router } from 'express';
import chatRoutes from './chat.routes';
import userRoutes from './user.routes';
import generalRoutes from './general.routes';

const router: Router = Router();

// NOT IN USE
router.use('/', generalRoutes);
// IN USE
router.use('/', chatRoutes);
// NOT IN USE
router.use('/api', userRoutes);

export default router;