import { FilterFactory } from './filter-factory';
import { SortFactory } from './sort-factory';

export class FindFactory {
    /** @type {import('knex').QueryBuilder} */
    #builder;

    /** @type {import('../request-filter/request-transformer').RequestFormatter} */
    #query;

    #relations;

    /** @type {import('./filter-factory').FilterFactory} */
    #filterFactory;

    /** @type {import('./sort-factory').SortFactory} */
    #sortFactory;

    /**
     *
     * @param {import('knex').QueryBuilder} connection
     * @param {import('../request-filter/request-transformer').RequestFormatter} query
     */
    constructor(connection, query) {
        this.#query = query;
        this.#builder = connection
            .select('*')
            .limit(query.size)
            .offset((query.page - 1) * query.size);
    }

    getBuilder() {
        this.#filterFactory = new FilterFactory(this.#builder, this.#query.filter);
        this.#filterFactory.buildDefaultFilter();

        this.#sortFactory = new SortFactory(this.#builder, this.#query.filter);
        this.#sortFactory.buildDefaultSort();
        return this;
    }

    execute() {
        return this.#builder;
    }
}
