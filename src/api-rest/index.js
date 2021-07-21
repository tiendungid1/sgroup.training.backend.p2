import express from 'express';
import { authRouter } from './auth/auth.router';

const router = express.Router();

router.use('/v1/auth', authRouter);

export const apiRouter = router;
