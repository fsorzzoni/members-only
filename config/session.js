import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "../database/pool.js";

const PgSession = connectPgSimple(session);

function setupSession() {
    return session({
        store: new PgSession({
            pool: pool,
            tableName: "sessions",
            createTableIfMissing: true
        }),
        secret: process.env.SESSION_SECRET,
        resave: false, 
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }});
}

export { setupSession };