import pool from "../database/pool.js";
import AppError from "../errors/AppError.js";

async function getUsers() {
    const query = "SELECT * FROM users;";
    
    const { rows } = await pool.query(query);

    return rows;
}

async function getUserById(id) {
    const query = "SELECT * FROM users WHERE id = $1;";

    const values = [id];

    const { rows } = await pool.query(query, values);

    return rows[0] || null;
}

async function getUserByUsername(username) {
    const query = "SELECT * FROM users WHERE username = $1;";

    const values = [username];

    const { rows } = await pool.query(query, values);

    return rows[0] || null;
}

async function insertUser({ firstName, lastName, username, password, isMember, isAdmin }) {
    const query = "INSERT INTO users (first_name, last_name, username, password, is_member, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;";

    const values = [firstName, lastName, username, password, isMember, isAdmin];

    const { rows } = await pool.query(query, values);

    if(rows.length <= 0) throw new AppError("insertUser failed");

    return rows[0];
}

async function deleteUser(id) {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *;";

    const values = [id];

    const { rows } = await pool.query(query, values);

    return rows[0] || null;
}

async function editUser(id, { firstName, lastName, username, password, isMember, isAdmin }) {
    const keys = [];
        const values = [];
        let i = 1;
    
        if(firstName !== undefined) {
            const key = "first_name = $" + i++;
            keys.push(key);
            values.push(firstName);
        }
    
        if(lastName !== undefined) {
            const key = "last_name = $" + i++;
            keys.push(key);
            values.push(lastName);
        }
    
        if(username !== undefined) {
            const key = "username = $" + i++;
            keys.push(key);
            values.push(username);
        }

        if(password !== undefined) {
            const key = "password = $" + i++;
            keys.push(key);
            values.push(password);
        }

        if(isMember !== undefined) {
            const key = "is_member = $" + i++;
            keys.push(key);
            values.push(isMember);
        }

        if(isAdmin !== undefined) {
            const key = "is_admin = $" + i++;
            keys.push(key);
            values.push(isAdmin);
        }
    
        const updates = keys.join(", ");
    
        const query = "UPDATE users SET " + updates + " WHERE id = $" + i + " RETURNING *;";
    
        values.push(id);
    
        const { rows } = await pool.query(query, values);
    
        return rows[0] || null;
}

export { getUsers, getUserById, getUserByUsername, insertUser, deleteUser, editUser };