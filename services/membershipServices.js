import "../env.js";
import NotFoundError from "../errors/NotFoundError.js";
import { editUser } from "../models/userModel.js";

function isAdminCode(code) {
    return code === process.env.ADMIN_CODE;
}

function isMemberCode(code) {
    return code === process.env.SECRET_CODE;
}

async function editUserMembership(id, isAdmin, isMember) {
    const user = await editUser(id, { isAdmin, isMember });

    if(user === null) throw new NotFoundError("User ID: " + id + " does not exist.");
}

export { isAdminCode, isMemberCode, editUserMembership };