export function paginationMiddleware(req, res, next) {
    res.limit = parseInt('5', 10);
    res.offset = parseInt('0', 10);

    if (req.query.hasOwnProperty('_pagination')) {
        res.limit = parseInt(req.query.limit, 10);
        res.offset = parseInt(req.query.offset, 10);
    }

    return next();
}
