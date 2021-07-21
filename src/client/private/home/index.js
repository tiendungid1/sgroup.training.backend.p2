import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.render('pages/home'));
router.get('/login', (req, res) => res.render('pages/auth/login'));
router.get('/register', (req, res) => res.render('pages/auth/register'));

export const homePageRouter = router;
