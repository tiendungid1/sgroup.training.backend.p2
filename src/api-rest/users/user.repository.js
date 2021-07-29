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
            .leftJoin('users_roles', 'users.id', 'users_roles.user_id')
            .leftJoin('roles', 'users_roles.role_id', 'roles.id')
            .where(fieldName, '=', value)
            .andWhere('deleted', '=', 'false');
    }

    getOneForEdit(fieldName, value) {
        return this.builder().select('users.username', 'users.fullname', 'users.email')
            .where(fieldName, '=', value);
    }

    updateOne(body) {
        return this.builder().where('id', '=', body.id)
            .update({
                username: body.username,
                fullname: body.fullname,
                email: body.email
            });
    }
    
    createOne(data) {
        return this.builder().insert(data);
    }

    getAll(column, type, boolColumn, boolValue, searchColumn, searchValue) {
        if (searchValue) {
            return this.builder().select('*')
                .leftJoin('users_roles', 'users.id', 'users_roles.user_id')
                .leftJoin('roles', 'users_roles.role_id', 'roles.id')
                .where(boolColumn, '=', boolValue)
                .andWhere(searchColumn, 'like', searchValue)
                .orderBy(column, type);
        }

        return this.builder().select('*')
            .leftJoin('users_roles', 'users.id', 'users_roles.user_id')
            .leftJoin('roles', 'users_roles.role_id', 'roles.id')
            .where(boolColumn, '=', boolValue)
            .orderBy(column, type);
    }

    softDeleteOne(fieldName, value) {
        return this.builder().where(fieldName, '=', value)
            .update({
                deleted: true,
                deleted_at: new Date()
            });
    }

    softDeleteMany(ids) {
        return this.builder().whereIn('id', ids)
            .update({
                deleted: true,
                deleted_at: new Date()
            });
    }

    restoreOne(fieldName, value) {
        return this.builder().where(fieldName, '=', value)
            .update({
                deleted: false,
                deleted_at: null
            });
    }

    forceDeleteOne(fieldName, value) {
        return this.builder().where(fieldName, '=', value).del();
    }

    restoreMany(ids) {
        return this.builder().whereIn('id', ids)
            .update({
                deleted: false,
                deleted_at: null
            });
    }

    forceDeleteMany(ids) {
        return this.builder().whereIn('id', ids).del();
    }
}
