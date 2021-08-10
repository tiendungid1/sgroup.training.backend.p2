import express from 'express';
import { homePageRouter } from './private/home';
import { blogPageRouter } from './private/blog';
import { userPageRouter } from './private/users';
import { authPageRouter } from './public/auth';
import { publicBlogRouter } from './public/blog';

const router = express.Router();

// Private
router.use('/user', userPageRouter);
router.use('/blog', blogPageRouter);
router.use('/home', homePageRouter);

// Public
router.use('/public-blog', publicBlogRouter);
router.use('/', authPageRouter);

export const clientRouter = router;
