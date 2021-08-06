export function searchMiddleware(req, res, next) {
    res._search = {
        enabled: false
    };

    if (req.query.hasOwnProperty('_search')) {
        Object.assign(res._search, {
            enabled: true,
            query: req.query._search
        });
    }

    return next();
}
