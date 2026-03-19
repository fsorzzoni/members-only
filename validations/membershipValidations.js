import { body } from "express-validator";

const validateJoinCode = [
    body("code").isLength({ min: 1, max: 30 }).withMessage("Code must be between 1 and 30 characters.")
];

export { validateJoinCode };