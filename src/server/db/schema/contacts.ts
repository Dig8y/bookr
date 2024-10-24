import { relations } from "drizzle-orm";
import { json, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { generateId } from "@/lib/id";
import { lifecycleDates } from "./utils";

export const contacts = pgTable("contacts", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  taskId: text("task_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  type: text("type").notNull(),
  additionalInfo: json("additional_info").$type<[] | null>().default(null),
  ...lifecycleDates,
});

export const contactsRelations = relations(contacts, ({ many }) => ({}));

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
