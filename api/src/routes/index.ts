import { Router } from 'express';
import { AuthRoutes } from './auth.routes';
import { UserRoutes } from './user.routes';
import { ResumeRoutes } from './resume.routes';


const router = Router();

router.use(new AuthRoutes().router);
router.use(new UserRoutes().router);
router.use(new ResumeRoutes().router);

export default router;
