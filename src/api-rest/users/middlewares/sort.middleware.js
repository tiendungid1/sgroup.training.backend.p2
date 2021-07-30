export function sortMiddleware(req, res, next) {
    res._sort = {
        column: 'users.id',
        type: 'asc'
    };

    if (req.query.hasOwnProperty('_sort')) {
        Object.assign(res._sort, {
            column: req.query.column,
            type: req.query.type
        });
    }

    return next();
}
