export function siteMiddleware(req, res, next) {
    res._site = {
        column: 'deleted',
        value: false
    };

    if (req.query.hasOwnProperty('_trash')) {
        Object.assign(res._site, {
            column: 'deleted',
            value: true
        });
    }

    return next();
}
