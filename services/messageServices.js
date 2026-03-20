import NotFoundError from "../errors/NotFoundError.js";
import { insertMessage, deleteMessage as deleteMessageFromDb } from "../models/messageModel.js";

async function newMessage(userId, title, text) {
    const date = new Date();
    await insertMessage({ title, text, date, userId});
}

async function deleteMessage(messageId) {
    const message = await deleteMessageFromDb(messageId);

    if(message === null) throw new NotFoundError("Message ID: " + messageId + " not found.");
}

export { newMessage, deleteMessage };