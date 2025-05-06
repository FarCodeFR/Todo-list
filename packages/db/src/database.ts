import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config({path: "../../.env"});

console.log("Database URL:", process.env.POSTGRES_URL);
const pool = new Pool({
	connectionString: process.env.POSTGRES_URL,
});

export const db = drizzle(pool, { schema });
