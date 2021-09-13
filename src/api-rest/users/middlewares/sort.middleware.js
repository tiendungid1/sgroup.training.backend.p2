export function sortMiddleware(req, res, next) {
    res._sort = {
        column: 'users.id',
        type: 'asc'
    };

    if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
        Object.assign(res._sort, {
            column: req.query.column,
            type: req.query.type
        });
    }

    return next();
}
