import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import NotFoundError from "../errors/NotFoundError.js";
import { getUserById, getUserByUsername } from "../models/userModel.js";

function setupPassport() {
    passport.use(
    new LocalStrategy(async (username, password, done) => {
    try {
        const user = await getUserByUsername(username);

        if(user === null) {
            return done(null, false, { message: "Incorrect username." });
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
        } catch(error) {
            return done(error);
        }
    })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);

        if(user === null) throw new NotFoundError("User ID: " + id + " does not exist.");

        done(null, user);
    } catch(error) {
        done(error);
    }
    });
}

export { setupPassport };