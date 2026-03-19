function ensureNotAuthenticated(req, res, next) {
    if(req.user !== null) {
        return res.redirect("/");
    }
    return next();
}

function ensureAuthenticated(req, res, next) {
    if(req.user === null) {
        return res.redirect("/auth/log-in");
    }
    return next();
}

export { ensureNotAuthenticated, ensureAuthenticated };