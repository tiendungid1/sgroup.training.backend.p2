import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.render('pages/blog'));

export const publicBlogRouter = router;
