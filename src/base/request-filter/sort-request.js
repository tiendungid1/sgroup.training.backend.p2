import { SORT } from './enum';

/**
 * Schema: [
 *  {
 *      column: SORT.ASC
 *      order: 'username'
 *  }
 * ]
 */
export class SortRequest {
    /**
     *
     * @param {string} sort
     * @returns {[Array<string>, string]}
     */
    static getSort(sort) {
        if (!sort || sort.length === 0) {
            return null;
        }

        if (typeof sort === 'string') {
            return [SortRequest.formatSort(sort)];
        }

        return SortRequest.formatArraySort(sort);
    }

    /**
     *
     * @param {string} sortParam
     */
    static formatSort(sortParam) {
        let column;
        let order;
        if (sortParam[0] === SORT.DESC) {
            order = SORT.DESC;
            column = sortParam.substring(1, sortParam.length);
        } else {
            order = SORT.ASC;
            column = sortParam;
        }

        return {
            column,
            order
        };
    }

    static formatArraySort(sortArray) {
        return sortArray.map(item => SortRequest.formatSort(item));
    }
}
