import { FILTER } from '../request-filter/enum';

export class FilterFactory {
    /** @type {import('knex').QueryBuilder} */
    #builder;

    /**
     * @type {[{column, sign, value}]}
     */
    #filter;

    constructor(queryBuilder, filter) {
        this.#builder = queryBuilder;
        this.#filter = filter;
    }

    buildDefaultFilter() {
        let hasInitialWhere = 0;
        if (this.#filter) {
            this.#filter.forEach(item => {
                if (!hasInitialWhere) {
                    hasInitialWhere += 1;
                    this.#builder.where(item.column, FILTER[item.sign], item.value);
                } else {
                    this.#builder.andWhere(item.column, FILTER[item.sign], item.value);
                }
            });
        }
    }
}
