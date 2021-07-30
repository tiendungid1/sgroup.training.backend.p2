import { logger } from 'common/utils';
import { DuplicateException, UnAuthorizedException, NotFoundException, UnprocessEntityException } from 'libs/http-exception/exceptions';
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

    async getAll(res) {
        try {
            let obj;

            if (res._search.enabled) {
                obj = await this.#userRepository.getAll(res._sort.column, res._sort.type, res.limit, res.offset, 'deleted', false, 'users.username', `%${res._search.query}%`);
            } else {
                obj = await this.#userRepository.getAll(res._sort.column, res._sort.type, res.limit, res.offset, 'deleted', false);
            }

            if (!obj.rows.length) {
                return null;
            }

            return obj;
        } catch (error) {
            throw new Error(error);
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
            throw new UnprocessEntityException(`Can not update account`);
        }
    }

    async softDeleteOneUser(id) {
        try {
            await this.#userRepository.softDeleteOne('id', id);
        } catch (error) {
            throw new UnprocessEntityException(`Can not soft delete account`);
        }
    }

    async softDeleteManyUsers(body) {
        switch (body.action) {
            case 'delete':
                await this.#userRepository.softDeleteMany(body.userIds);
                break;
            default:
                throw new UnprocessEntityException(`Can not soft delete accounts`);
        }
    }

    async getUsersInRecycleBin(res) {
        try {
            const builder = this.#userRepository.getAll()
                .leftJoin('users_roles', 'users.id', 'users_roles.user_id')
                .leftJoin('roles', 'users_roles.role_id', 'roles.id')
                .where('deleted', '=', true);

            if (res._sort.type === 'default') {
                res._sort.column = 'users.id';
                res._sort.type = 'asc';
            }

            let rows;

            if (res._search !== '') {
                builder
                    .andWhere('users.username', 'like', `%${res._search}%`)
                    .orderBy(res._sort.column, res._sort.type);
                // rows = await this.#userRepository.getAll(res._sort.column, res._sort.type, 'deleted', true, 'users.username', `%${res._search}%`);
            } else {
                builder.orderBy(res._sort.column, res._sort.type);
                // rows = await this.#userRepository.getAll(res._sort.column, res._sort.type, 'deleted', true);
            }

            rows = await builder;

            if (!rows.length) {
                return null;
            }

            // console.log(res.limit, res.offset);
            // const users = rows.splice(0, 5);
            // users.push(rows.pop());

            // console.log(users);

            return rows;
        } catch (error) {
            throw new Error(error);
        }
    }

    async restoreOneUser(id) {
        try {
            await this.#userRepository.restoreOne('id', id);
        } catch (error) {
            throw new UnprocessEntityException(`Can not restore account`);
        }
    }

    async forceDeleteOneUser(id) {
        try {
            await this.#userRepository.forceDeleteOne('id', id);
        } catch (error) {
            throw new UnprocessEntityException(`Can not soft delete account`);
        }
    }

    async handleTrashPageActions(body) {
        switch (body.action) {
            case 'restore':
                await this.#userRepository.restoreMany(body.userIds);
                break;
            case 'delete':
                await this.#userRepository.forceDeleteMany(body.userIds);
                break;
            default:
                throw new UnprocessEntityException(`Can not handle actions`);
        }
    }
}
