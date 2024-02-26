import { Router } from 'express';
import { signup } from '../controlles/auth/signup.controller';
import { login } from '../controlles/auth/login.controller';
import { logout } from '../controlles/auth/logout.controller';

const router = Router();

router.get('/signup', signup);

router.get('/login', login);

router.get('/logout', logout);

export default router;
