import { validateSignUp } from "../validations/authValidations.js";
import { ensureNotAuthenticated, logInHandler, signUpHandler } from "../middlewares/authMiddleware.js";

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

export { signUpGet, signUpPost, logInGet, logInPost };