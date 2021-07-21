import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.render('pages/blog/index'));

export const blogPageRouter = router;
