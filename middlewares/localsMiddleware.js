function userCredentialsToLocalsHandler(req, res, next) {
    res.locals.user = req.user ?? null;
    next();
}

export { userCredentialsToLocalsHandler };