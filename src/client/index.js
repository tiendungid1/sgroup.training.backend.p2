import express from 'express';
import { homePageRouter } from './private/home';
import { blogPageRouter } from './private/blog';

const router = express.Router();

router.use('/blog', blogPageRouter);
router.use('/', homePageRouter);

export const clientRouter = router;
