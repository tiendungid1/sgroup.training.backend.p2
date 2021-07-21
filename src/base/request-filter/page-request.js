export class PageRequest {
    static #DEFAULT_PAGE = 1;

    static getPage(page) {
        /**
         * @default 1
         * Parse to integer for validate
         */
        if (!page) return PageRequest.#DEFAULT_PAGE;
        const parsedPage = parseInt(page, 10);
        if (Number.isNaN(parsedPage)) {
            throw new Error('Page is not format as numeric');
        }
        return parsedPage;
    }
}
