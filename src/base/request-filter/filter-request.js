import { FILTER } from './enum/filter.enum';

export class FilterRequest {
    static getFilter(filter) {
        if (!filter || filter?.length === 0) {
            return null;
        }

        if (typeof filter === 'string') {
            return [FilterRequest.formatFromFilterParam(filter)];
        }

        if (typeof filter === 'object' && filter.length > 0) {
            return FilterRequest.formatArrayFilterParam(filter);
        }
    }

    /**
     *
     * @param {Array<string>} filter
     */
    static formatArrayFilterParam(filter) {
        return filter.map(item => FilterRequest.formatFromFilterParam(item));
    }

    static formatFromFilterParam(filter) {
        const seperatePatterns = filter.split('|');

        if (seperatePatterns.length !== 3) {
            throw new Error('Filter params is not format correctly! Required 3 arguments');
        }

        const [column, sign, value] = seperatePatterns;

        FilterRequest.isSignAcceptable(sign);

        return {
            column,
            sign,
            value
        };
    }

    /**
     *
     * @param {*} sign
     * @returns {boolean}
     */
    static isSignAcceptable(sign) {
        if (FILTER[sign] === undefined) {
            throw new Error(`Filter params is not format correctly! Second argument is not one of ${Object.keys(FILTER).toString()}`);
        }
        return FILTER[sign];
    }
}
