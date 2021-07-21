export class SearchRequest {
    /**
     *
     * @param {string} search
     * @returns {[Array<string>, string]}
     */
    static getSearch(search) {
        if (!search) {
            return null;
        }
        const seperateSearchParam = search.split('|');

        if (seperateSearchParam > 2) {
            throw new Error('Search param format not correctly');
        }

        const [fields, keyword] = seperateSearchParam;
        return {
            fields: SearchRequest.getFields(fields),
            keyword
        };
    }

    static getFields(fields) {
        return fields.split(',');
    }
}
