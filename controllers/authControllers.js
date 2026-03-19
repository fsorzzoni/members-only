import { validationResult, matchedData } from "express-validator";
import { signUpUser } from "../services/authServices.js";
import { validateSignUp } from "../validations/authValidations.js";

function signUpGet(req, res) {
    return res.render("signUp");
}

const signUpPost = [
    validateSignUp,
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("signUp", {
                user: { firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username },
                errors: errors.array()
            });
        }

        const { firstName, lastName, username, password } = matchedData(req);
        
        try {
        signUpUser(firstName, lastName, username, password);

        return res.redirect("/");

        } catch(error) {
            if(error.code === "23505") {
                return res.status(409).render("signUp", {
                    user: { firstName, lastName, username },
                    errors: [{ msg: "Username already exists."}]
                });
            }
            return next(error);
        }
    }
]

async function logInGet(req, res) {

}

const logInPost = [];

export { signUpGet, signUpPost, logInGet, logInPost };