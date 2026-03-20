import { insertMessage } from "../models/messageModel.js";

async function newMessage(userId, title, text) {
    const date = new Date();
    await insertMessage({ title, text, date, userId});
}

export { newMessage };