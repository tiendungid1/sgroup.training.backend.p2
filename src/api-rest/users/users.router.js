import express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

router.get('/', UsersController.getSingleton().getAll);
router.patch('/update-one', UsersController.getSingleton().updateOneUser);

export const userRouter = router;
