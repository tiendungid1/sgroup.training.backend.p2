import express from 'express';
import { homePageRouter } from './private/home';
import { blogPageRouter } from './private/blog';
import { userPageRouter } from './private/users';

const router = express.Router();

router.use('/user', userPageRouter);
router.use('/blog', blogPageRouter);
router.use('/', homePageRouter);

export const clientRouter = router;
