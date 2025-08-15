import { Router } from 'express';
import { healthCheck, getModels, welcome } from '../controllers/general.controller';

const router: Router = Router();

router.get('/', welcome);
router.get('/api/health', healthCheck);
router.get('/api/models', getModels);

export default router;