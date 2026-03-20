import { body } from "express-validator";

const validateMessage = [
    body("title").isLength({ min: 1, max: 60 }).withMessage("Title must be between 1 and 60 characters."),
    body("text").isLength({ min: 1, max: 300 }).withMessage("Text must be between 1 and 300 characters.")
];

export { validateMessage };