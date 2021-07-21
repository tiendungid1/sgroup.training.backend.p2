import {
    PageRequest,
    SizeRequest,
    FilterRequest,
    SearchRequest,
    SortRequest
} from '.';

export class RequestFormatter {
    page;

    size;

    sort;

    filter;

    search;

    constructor(query) {
        this.page = PageRequest.getPage(query.page);
        this.size = SizeRequest.getSize(query.size);
        this.sort = SortRequest.getSort(query.sort);
        this.filter = FilterRequest.getFilter(query.filter);
        this.search = SearchRequest.getSearch(query.search);
    }

    toJson() {
        return {
            page: this.page,
            size: this.size,
            sort: this.sort,
            filter: this.filter,
            search: this.search
        };
    }
}
