import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => res.render('pages/public/auth/login'));
router.get('/register', (req, res) => res.render('pages/public/auth/register'));

export const authPageRouter = router;
