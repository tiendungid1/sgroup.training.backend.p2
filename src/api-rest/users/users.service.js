import { logger } from 'common/utils';
import { DuplicateException, UnAuthorizedException } from 'libs/http-exception/exceptions';
import { UserRepository } from './user.repository';

export class UsersService {
    /**
     * @type {UsersService}
     */
    static #instance;

    static getSingleton() {
        if (!UsersService.#instance) {
            UsersService.#instance = new UsersService(UserRepository.getSingleton());
        }
        logger.info(`[${UsersService.name}] is bundling`);
        return UsersService.#instance;
    }

    /**
     * @type {UserRepository}
     */
    #userRepository;

    constructor(userRepository) {
        this.#userRepository = userRepository;
    }

    async findOneAndReturn(email) {
        try {
            const data = await this.#userRepository.findOne('email', email);
            
            if (!data.length) {
                return null;
            }

            const user = data[0];

            return user;
        } catch (error) {
            throw new UnAuthorizedException(`Your account ${email} does not exist`);
        }
    }

    async createOneAndReturn(data) {
        try {
            await this.#userRepository.createOne(data);
        } catch (error) {
            throw new DuplicateException(`username: ${data.username} has been existed`);
        }
    }
}
