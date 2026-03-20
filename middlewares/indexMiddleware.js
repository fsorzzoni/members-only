import { getMembersMessages } from "../models/messageModel.js";

async function mainPageHandler(req, res, next) {
    try {
        const currentUserIsMember = req.user?.isMember ?? false;
        const memberMessages = await getMembersMessages(currentUserIsMember);

        return res.render("mainPage", { messages: memberMessages });
    } catch(error) {
        return next(error);
    }
}

export { mainPageHandler };