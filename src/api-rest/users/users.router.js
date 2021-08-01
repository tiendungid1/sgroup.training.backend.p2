import express from 'express';
import { UsersController } from './users.controller';
import { sortMiddleware, searchMiddleware, paginationMiddleware, siteMiddleware } from './middlewares';

const router = express.Router();

router.patch('/update-one', UsersController.getSingleton().updateOneById);
router.delete('/:id', UsersController.getSingleton().softDeleteOneById);
router.delete('/:id/force', UsersController.getSingleton().forceDeleteOneById);
router.patch('/:id/restore', UsersController.getSingleton().restoreOneById);
router.post('/handle-user-page-actions', UsersController.getSingleton().handleUserPageActions);
router.post('/handle-trash-page-actions', UsersController.getSingleton().handleTrashPageActions);
router.get('/', siteMiddleware, paginationMiddleware, sortMiddleware, searchMiddleware, UsersController.getSingleton().getAll);

export const userRouter = router;
