import connection from '../../database';
import { FindFactory } from './find-factory';

export class KnexRepositoryBase {
    #table;

    constructor(table) {
        this.#table = table;
    }

    query() {
        return connection(this.#table).clone();
    }

    findAll(query) {
        return (new FindFactory(this.query(), query)).getBuilder();
    }

    findOneById(id, columns = '*') {
        return this.query().select(columns).where({ id }).first();
    }

    insert(data = {}, trx = {}, columns = '*') {
        return this.query().insert(data).transacting(trx).returning(columns);
    }

    update(data = {}, trx = {}) {
        return this.query().update(data).transacting(trx);
    }

    delete(id, trx = {}) {
        return this.query().delete().transacting(trx).where({ id });
    }

    softDelete(id, trx = {}) {
        return this.query().delete().transacting(trx).where({ id })
            .andWhere('deleted_at', '=', null);
    }

    restore(id, trx = {}) {
        return this.query().update().transacting(trx).where({ id })
            .andWhere('deleted_at', '<>', null);
    }
}
