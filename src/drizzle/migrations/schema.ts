import { pgTable, text } from "drizzle-orm/pg-core"

export const dogs = pgTable("dogs", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	description: text("description"),
});