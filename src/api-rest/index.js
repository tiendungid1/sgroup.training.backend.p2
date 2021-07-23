import express from 'express';
import { authRouter } from './auth/auth.router';
import { userRouter } from './users/users.router';

const router = express.Router();

router.use('/v1/auth', authRouter);
router.use('/v1/users', userRouter);

export const apiRouter = router;
