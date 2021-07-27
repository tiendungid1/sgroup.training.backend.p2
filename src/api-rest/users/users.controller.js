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
            const data = await this.#userService.getAll();
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

    sofeDeleteOneById = async (req, res) => {
        try {
            await this.#userService.sofeDeleteOneUser(req.params.id);
            return res.status(OK).json({ message: 'OK' });
        } catch (error) {
            return httpExceptionHandler(error)(res);
        }
    }
}
