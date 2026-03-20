import { Client } from "pg";

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.argv[2]
    });
    await client.connect();

    await client.query(`
        CREATE EXTENSION IF NOT EXISTS citext;
        `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(25) NOT NULL,
        last_name VARCHAR(25) NOT NULL,
        username CITEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        is_member BOOLEAN DEFAULT FALSE,
        is_admin BOOLEAN DEFAULT FALSE
        );
        `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        title VARCHAR(65) NOT NULL,
        text VARCHAR(305),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );
        `);

    await client.query(`
        CREATE INDEX idx_messages_user_id ON messages(user_id);
        `);

    await client.end();
    console.log("done");
}

main();