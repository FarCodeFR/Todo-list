import {
	pgTable,
	serial,
	varchar,
	boolean,
} from "drizzle-orm/pg-core";

export const cards = pgTable("cards", {
	id: serial("id").primaryKey().notNull().unique(),
	title: varchar("title", { length: 20 }).notNull(),
	completed: boolean("completed").default(false),
});
