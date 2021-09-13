export function siteMiddleware(req, res, next) {
    res._site = {
        column: 'deleted',
        value: false
    };

    if (Object.prototype.hasOwnProperty.call(req.query, '_trash')) {
        Object.assign(res._site, {
            column: 'deleted',
            value: true
        });
    }

    return next();
}
