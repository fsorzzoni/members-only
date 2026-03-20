import { ensureAuthenticated } from "../middlewares/authMiddleware.js";
import { validateMessage } from "../validations/messageValidations.js";
import { newMessageHandler } from "../middlewares/messageMiddleware.js";

const newMessageGet = [
    ensureAuthenticated,
    (req, res) => {
        return res.render("newMessageForm");
    }
];

const newMessagePost = [
    ensureAuthenticated,
    validateMessage,
    newMessageHandler
];

export { newMessageGet, newMessagePost };