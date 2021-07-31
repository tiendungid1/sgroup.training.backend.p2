import { logger } from 'common/utils';
import { httpExceptionHandler } from 'libs/http-exception/handler/exception.handler';
import { UsersService } from './users.service';
import { OK } from 'http-status';

export class UsersController {
    /**
     * @type {UsersController}
     */
    static #instance;

    static getSingleton() {
        if (!UsersController.#instance) {
            UsersController.#instance = new UsersController(UsersService.getSingleton());
            logger.info(`[${UsersController.name}] is bundling`);
        }
        return UsersController.#instance;
    }

    /**
     * @type {UsersService}
     */
    #userService;

    constructor(userService) {
        this.#userService = userService;
    }

    getAll = async (req, res) => {
        try {
            const data = await this.#userService.getAll(res, 'deleted', false);
            return res.status(OK).json(data);
        } catch (error) {
            return httpExceptionHandler(error)(res);
        }
    }

    updateOneById = async (req, res) => {
        try {
            await this.#userService.updateOneUser(req.body);
            return res.status(OK).json({ message: 'OK' });
        } catch (error) {
            return httpExceptionHandler(error)(res);
        }
    }

    softDeleteOneById = async (req, res) => {
        try {
            await this.#userService.softDeleteOneUser(req.params.id);
            return res.status(OK).json({ message: 'OK' });
        } catch (error) {
            return httpExceptionHandler(error)(res);
        }
    }

    handleUserPageActions = async (req, res) => {
        try {
            await this.#userService.softDeleteManyUsers(req.body);
            return res.status(OK).json({ message: 'OK' });
        } catch (error) {
            return httpExceptionHandler(error)(res);
        }
    }

    getAllDeletedUsers = async (req, res) => {
        try {
            const data = await this.#userService.getAll(res, 'deleted', true);
            return res.status(OK).json(data);
        } catch (error) {
            return httpExceptionHandler(error)(res);
        }
    }

    restoreOneById = async (req, res) => {
        try {
            await this.#userService.restoreOneUser(req.params.id);
            return res.status(OK).json({ message: 'OK' });
        } catch (error) {
            return httpExceptionHandler(error)(res);
        }
    }

    forceDeleteOneById = async (req, res) => {
        try {
            await this.#userService.forceDeleteOneUser(req.params.id);
            return res.status(OK).json({ message: 'OK' });
        } catch (error) {
            return httpExceptionHandler(error)(res);
        }
    }
    
    handleTrashPageActions = async (req, res) => {
        try {
            await this.#userService.handleTrashPageActions(req.body);
            return res.status(OK).json({ message: 'OK' });
        } catch (error) {
            return httpExceptionHandler(error)(res);
        }
    }
}
