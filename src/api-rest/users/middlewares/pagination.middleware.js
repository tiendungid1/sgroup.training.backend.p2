export function paginationMiddleware(req, res, next) {
    res.limit = parseInt('5', 10);
    res.offset = parseInt('0', 10);

    if (Object.prototype.hasOwnProperty.call(req.query, '_pagination')) {
        res.limit = parseInt(req.query.limit, 10);
        res.offset = parseInt(req.query.offset, 10);
    }

    return next();
}
