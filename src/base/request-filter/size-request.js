export class SizeRequest {
    size;

    static #DEFAULT_SIZE = 10;

    static getSize(size) {
        /**
         * @default 10
         * Parse to integer for validate
         */
        if (!size) return SizeRequest.#DEFAULT_SIZE;
        const parsedSize = parseInt(size, 10);
        if (Number.isNaN(parsedSize)) {
            throw new Error('Size is not format as numeric');
        }
        return parsedSize;
    }
}
