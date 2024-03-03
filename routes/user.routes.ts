import { Router } from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsers } from '../controlles/user/getUsers.controller';

const router = Router();

router.get('/', protectRoute, getUsers);

export default router;
