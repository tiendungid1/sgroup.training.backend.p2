/* eslint-disable function-paren-newline */
import express from 'express';
import { Role } from 'common/enum';
import { UsersController } from './users.controller';
import {
    sortMiddleware, searchMiddleware, paginationMiddleware, siteMiddleware
} from './middlewares';
import { jwtAuthenticateMiddleware } from '../auth/services/auth.strategy';
import { authorizeRole } from '../auth/services/authorization.strategy';

const router = express.Router();

router.patch('/update-one', UsersController.getSingleton().updateOneById);
router.delete('/:id', UsersController.getSingleton().softDeleteOneById);
router.delete('/:id/force', UsersController.getSingleton().forceDeleteOneById);
router.patch('/:id/restore', UsersController.getSingleton().restoreOneById);
router.post('/handle-user-page-actions', UsersController.getSingleton().handleUserPageActions);
router.post('/handle-trash-page-actions', UsersController.getSingleton().handleTrashPageActions);
router.get('/',
    jwtAuthenticateMiddleware,
    authorizeRole(Role.ADMIN),
    siteMiddleware,
    paginationMiddleware,
    sortMiddleware,
    searchMiddleware,
    UsersController.getSingleton().getAll
);

export const userRouter = router;
