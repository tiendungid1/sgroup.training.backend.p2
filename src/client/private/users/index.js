import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.render('pages/user/user.pug'));

export const userPageRouter = router;
