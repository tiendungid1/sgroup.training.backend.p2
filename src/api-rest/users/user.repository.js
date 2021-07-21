import { logger } from 'common/utils';
import { knexConnection } from 'database';

export class UserRepository {
    /**
     * @type {UsersService}
     */
    static #instance;

    static getSingleton() {
        if (!UserRepository.#instance) {
            UserRepository.#instance = new UserRepository(knexConnection.table('users'));
            logger.info(`[${UserRepository.name}] is bundling`);
        }
        return UserRepository.#instance;
    }

    /**
     * @type {import('knex').QueryInterface}
     */
    connection;

    constructor(connection) {
        this.connection = connection;
    }

    builder() {
        return this.connection.clone();
    }

    findOne(fieldName, value) {
        return this.builder().select('users_roles.user_id', 'users.username', 'users.email', 'users.password', 'roles.id AS role_id', 'roles.name AS role_name')
            .from('users')
            .leftJoin('users_roles', 'users.id', 'users_roles.user_id')
            .leftJoin('roles', 'users_roles.role_id', 'roles.id')
            .where(fieldName, '=', value);
    }
    
    createOne(data) {
        return this.builder().insert(data);
    }
}
