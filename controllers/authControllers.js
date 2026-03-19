import { body, validationResult, matchedData } from "express-validator";
import { signUpUser } from "../services/authServices.js";

const validateUserSignUp = [
    body("firstName").trim()
    .isAlpha().withMessage("First name must only contain letters.")
    .isLength({ min: 1, max: 20 }).withMessage("First name must be between 1 and 20 characters."),

    body("lastName").trim()
    .isAlpha().withMessage("Last name must only contain letters")
    .isLength({ min: 1, max: 20 }).withMessage("Last name must be between 1 and 20 characters."),

    body("username").trim()
    .isAlphanumeric().withMessage("Username must be alphanumeric.")
    .isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 and 20 characters."),

    body("password")
    .isLength({ min: 6, max: 30}).withMessage("Password must be between 6 and 30 characters."),

    body("confirmPassword")
    .custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error("Passwords do not match.");
        }
        return true;
    })
];

async function signUpUserGet(req, res) {
    res.render("signUp");
}

const signUpUserPost = [
    validateUserSignUp,
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