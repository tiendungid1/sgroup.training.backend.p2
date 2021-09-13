export function searchMiddleware(req, res, next) {
    res._search = {
        enabled: false
    };

    if (Object.prototype.hasOwnProperty.call(req.query, '_search')) {
        Object.assign(res._search, {
            enabled: true,
            query: req.query._search
        });
    }

    return next();
}
