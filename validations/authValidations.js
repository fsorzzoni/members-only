import { body } from "express-validator";

const validateSignUp = [
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

export { validateSignUp, validateLogIn };