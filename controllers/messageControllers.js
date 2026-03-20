import { ensureAuthenticated, ensureIsAdmin } from "../middlewares/authMiddleware.js";
import { validateMessage } from "../validations/messageValidations.js";
import { deleteMessageHandler, newMessageHandler } from "../middlewares/messageMiddleware.js";

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

const deleteMessageGet = [
    ensureAuthenticated,
    ensureIsAdmin,
    deleteMessageHandler
];

export { newMessageGet, newMessagePost, deleteMessageGet };