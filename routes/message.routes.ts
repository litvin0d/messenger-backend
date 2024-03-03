import { Router } from 'express';

import protectRoute from '../middleware/protectRoute.js';
import { sendMessage } from '../controlles/messages/sendMessage.controller';
import { getMessages } from '../controlles/messages/getMessages.controller';

const router = Router();

router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);

export default router;
