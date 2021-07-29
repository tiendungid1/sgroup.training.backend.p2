export function sortMiddleware(req, res, next) {
    res._sort = {
        enabled: false,
        type: 'default'
    };

    if (req.query.hasOwnProperty('_sort')) {
        Object.assign(res._sort, {
            enabled: true,
            column: req.query.column,
            type: req.query.type
        });
    }

    return next();
}
