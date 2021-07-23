import express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

router.get('/', UsersController.getSingleton().getAll);

export const userRouter = router;
