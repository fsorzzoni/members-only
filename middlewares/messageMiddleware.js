import { validationResult, matchedData } from "express-validator";
import { newMessage } from "../services/messageServices.js";

async function newMessageHandler(req, res, next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).render("newMessage", {
            message: { title: req.body.title, text: req.body.text },
            errors: errors.array()
        });
    }

    const { title, text } = matchedData(req);

    try {
        await newMessage(req.user.id, title, text);
    } catch(error) {
        return next(error);
    }

    return res.redirect("/");
}

export { newMessageHandler };