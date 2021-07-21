import express from 'express';
import { AuthController } from './auth.controller';
import { registerValidator, loginValidator } from './validator';

const router = express.Router();

router.post('/login', loginValidator, AuthController.getSingleton().login);
router.post('/register', registerValidator, AuthController.getSingleton().register);

export const authRouter = router;
