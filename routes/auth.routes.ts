import { Router } from 'express';
import { signup } from '../controlles/auth/signup.controller';
import { login } from '../controlles/auth/login.controller';
import { logout } from '../controlles/auth/logout.controller';

const router = Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

export default router;
