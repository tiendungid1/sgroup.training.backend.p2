export class SortFactory {
    /** @type {import('knex').QueryBuilder} */
    #builder;

    /**
     * @type {[{column, order}]}
     */
    #sort;

    constructor(queryBuilder, sort) {
        this.#builder = queryBuilder;
        this.#sort = sort;
    }

    buildDefaultSort() {
        if (this.#sort) {
            this.#builder.orderBy(this.#sort);
        }
    }
}
