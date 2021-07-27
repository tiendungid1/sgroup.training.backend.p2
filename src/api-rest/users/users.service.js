import { logger } from 'common/utils';
import { DuplicateException, UnAuthorizedException, NotFoundException } from 'libs/http-exception/exceptions';
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
            const row = await this.#userRepository.findOne('email', email);
            
            if (!row.length) {
                return null;
            }

            const user = row[0];

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

    async getAll() {
        try {
            const rows = await this.#userRepository.getAll();
            
            if (!rows.length) {
                return null;
            }

            const users = {};

            rows.forEach(row => {
                if (!users[row.user_id]) {
                    users[row.user_id] = {
                        ...row,
                        roles: [row.name]
                    };
                } else {
                    users[row.user_id].roles.push(row.name);
                }
            });

            return Object.values(users);
        } catch (error) {
            throw new UnAuthorizedException(`Your account ${email} does not exist`);
        }
    }

    async getOneForEdit(id) {
        try {
            const row = await this.#userRepository.getOneForEdit('id', id);
            
            if (!row.length) {
                return null;
            }

            const user = row[0];

            return user;
        } catch (error) {
            throw new NotFoundException(`Can not get account's info`);
        }
    }

    async updateOneUser(body) {
        try {
            await this.#userRepository.updateOne(body);
        } catch (error) {
            throw new NotFoundException(`Can not update account`);
        }
    }

    async sofeDeleteOneUser(id) {
        try {
            await this.#userRepository.softDeleteOne('id', id);
        } catch (error) {
            throw new NotFoundException(`Can not soft delete account`);
        }
    }
}
