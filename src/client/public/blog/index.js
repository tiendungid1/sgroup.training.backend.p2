import express from 'express';

const router = express.Router();

router.get('/demo-post', (req, res) => res.render('pages/public/blog/post/demo'));
router.get('/', (req, res) => res.render('pages/public/blog/blog'));

export const publicBlogRouter = router;
