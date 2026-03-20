import { getMembersMessages } from "../models/messageModel.js";

async function mainPageHandler(req, res, next) {
    try {
        const memberMessages = await getMembersMessages();

        return res.render("mainPage", { messages: memberMessages });
    } catch(error) {
        return next(error);
    }
}

export { mainPageHandler };