import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.render('pages/private/home'));

export const homePageRouter = router;
