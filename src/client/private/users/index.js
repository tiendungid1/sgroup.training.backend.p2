import express from 'express';
import { UsersService } from '../../../api-rest/users/users.service';

const router = express.Router();

router.get('/:id/edit', async (req, res) => {
    try {
        const user = await UsersService.getSingleton().getOneForEdit(req.params.id);
        return res.render('pages/private/user/edit-user.pug', { user });
    } catch (error) {
        return res.json({ error });
    }
});
router.get('/trash', (req, res) => res.render('pages/private/user/trash.pug'));
router.get('/', (req, res) => res.render('pages/private/user/user.pug'));

export const userPageRouter = router;
