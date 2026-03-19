import { validateSignUp } from "../validations/authValidations.js";
import { ensureNotAuthenticated, logInHandler, signUpHandler } from "../middlewares/authMiddleware.js";

const signUpGet = [
    ensureNotAuthenticated,
    (req, res) => {
        return res.render("signUp");
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
        return res.render("logIn");
    }
];

const logInPost = [
    ensureNotAuthenticated,
    logInHandler
];

export { signUpGet, signUpPost, logInGet, logInPost };