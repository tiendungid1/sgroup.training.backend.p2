import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.render('pages/blog/blog'));

export const blogPageRouter = router;
