import { validationResult, matchedData } from "express-validator";
import { signUpUser } from "../services/authServices";
import passport from "passport";
import ForbiddenError from "../errors/ForbiddenError.js";

function ensureNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect("/");
    }
    return next();
}

function ensureAuthenticated(req, res, next) {
    if(!req.isAuthenticated()) {
        return res.redirect("/auth/log-in");
    }
    return next();
}

function ensureIsAdmin(req, res, next) {
    if(!req.user.isAdmin) {
        return next(new ForbiddenError("User ID: " + req.user.id + " is not an admin."));
    }
    return next();
}

async function signUpHandler(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).render("signUp", {
            user: { firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username },
            errors: errors.array()
        });
    }

    const { firstName, lastName, username, password } = matchedData(req);
    
    try {
    await signUpUser(firstName, lastName, username, password);
    } catch(error) {
        if(error.code === "23505") {
            return res.status(409).render("signUp", {
                user: { firstName, lastName, username },
                errors: [{ msg: "Username already exists."}]
            });
        }
        return next(error);
    }
    return res.redirect("/");
}

function logInHandler(req, res, next) {
    // Validate inputs
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).render("logIn", {
            username: req.body.username,
            errors: errors.array()
        });
    }

    passport.authenticate("local", (err, user, info) => {
        if(err) return next(err);

        if(!user) {
            return res.status(401).render("logIn", {
                username: req.body.username,
                errors: [{ msg: info.message || "Login failed." }]
            });
        } 

        req.logIn(user, (err) => {
            if(err) return next(err);

            return res.redirect("/");
        });
    })(req, res, next);
}

export { ensureNotAuthenticated, ensureAuthenticated, ensureIsAdmin, signUpHandler, logInHandler };