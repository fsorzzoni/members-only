import { Pool } from "pg";
import "../env.js";

export default new Pool({
    connectionString: process.env.DATABASE_URL
});