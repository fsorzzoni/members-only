import { validateSignUp } from "../validations/authValidations.js";
import { ensureAuthenticated, ensureNotAuthenticated, logInHandler, logOutHandler, signUpHandler } from "../middlewares/authMiddleware.js";

const signUpGet = [
    ensureNotAuthenticated,
    (req, res) => {
        return res.render("signUp", {
            errors: [],
            user: null
        });
    }
];

const signUpPost = [
    ensureNotAuthenticated,
    validateSignUp,
    signUpHandler
];

const logInGet = [
    ensureNotAuthenticated,
    (req, res) => {
        return res.render("logIn", {
            username: null,
            errors: []
        });
    }
];

const logInPost = [
    ensureNotAuthenticated,
    logInHandler
];

const logOutGet = [
    ensureAuthenticated,
    logOutHandler
];

export { signUpGet, signUpPost, logInGet, logInPost, logOutGet };