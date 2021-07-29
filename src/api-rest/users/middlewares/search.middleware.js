export function searchMiddleware(req, res, next) {
    res._search = '';
    
    if (req.query.hasOwnProperty('_search')) {
        res._search = req.query._search;
    }

    return next();
}
