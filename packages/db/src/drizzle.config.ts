import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

if (
	!process.env.POSTGRES_HOST ||
	!process.env.POSTGRES_USER ||
	!process.env.POSTGRES_PASSWORD ||
	!process.env.POSTGRES_DB
) {
	throw new Error(
		"Les variables d 'environnement nécessaires ne sont pas définies.",
	);
}

export default defineConfig({
	schema: "./schema.ts",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		host: process.env.POSTGRES_HOST,
		port: Number(process.env.POSTGRES_PORT),
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		ssl: false,
	},
});

