import bcrypt from "bcryptjs";
import { insertUser } from "../models/userModel.js";

async function signUpUser(firstName, lastName, username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await insertUser({
            firstName, lastName, username, password: hashedPassword, isMember: false, isAdmin: false
    });
}

export { signUpUser };