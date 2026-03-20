import pool from "../database/pool.js";
import AppError from "../errors/AppError.js";

async function getMessages() {
    const query = "SELECT * FROM messages;";
    
    const { rows } = await pool.query(query);

    return rows;
}

async function getMembersMessages(isMember) {
    const fields = isMember ? "u.username, m.timestamp" : "NULL AS username, NULL as timestamp";
    const query = `
    SELECT ${fields}, m.title, m.text, m.id
    FROM users u JOIN messages m ON (u.id = m.userId) 
    WHERE u.isMember = true
    ORDER BY m.timestamp DESC;
    `;

    const { rows } = await pool.query(query);

    return rows;
}

async function getMessageById(id) {
    const query = "SELECT * FROM messages WHERE id = $1;";

    const values = [id];

    const { rows } = await pool.query(query, values);

    return rows[0] ?? null;
}

async function insertMessage({ title, text, timestamp, userId }) {
    const query = "INSERT INTO messages (title, text, timestamp, user_id) VALUES ($1, $2, $3, $4) RETURNING *;";

    const values = [title, text, timestamp, userId];

    const { rows } = await pool.query(query, values);

    if(rows.length <= 0) throw new AppError("insertMessage failed.");

    return rows[0];
}

async function deleteMessage(id) {
    const query = "DELETE FROM messages WHERE id = $1 RETURNING *;";

    const values = [id];

    const { rows } = await pool.query(query, values);

    return rows[0] ?? null;
}

async function deleteUserMessages(userId) {
    const query = "DELETE FROM messages WHERE user_id = $1 RETURNING *;";

    const values = [userId];

    const { rows } = await pool.query(query, values);

    return rows;
}

async function editMessage(id, { title, text, timestamp }) {
    const keys = [];
    const values = [];
    let i = 1;

    if(title !== undefined) {
        const key = "title = $" + i++;
        keys.push(key);
        values.push(title);
    }

    if(text !== undefined) {
        const key = "text = $" + i++;
        keys.push(key);
        values.push(text);
    }

    if(timestamp !== undefined) {
        const key = "timestamp = $" + i++;
        keys.push(key);
        values.push(timestamp);
    }

    const updates = keys.join(", ");

    const query = "UPDATE messages SET " + updates + " WHERE id = $" + i + " RETURNING *;";

    values.push(id);

    const { rows } = await pool.query(query, values);

    return rows[0] ?? null;
}

export { getMessages, getMembersMessages, getMessageById, insertMessage, deleteMessage, deleteUserMessages, editMessage };