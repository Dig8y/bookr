import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { generateId } from "@/lib/id";
import { lifecycleDates } from "../../lib/validations/utils";

export const tasks = pgTable("tasks", {
  id: varchar("id", { length: 32 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  userId: varchar("user_id", { length: 32 }).notNull(),
  promptId: varchar("prompt_id", { length: 32 }),
  title: text("title").default("New Task").notNull(),
  status: varchar("status", { length: 32 }).default("Pending").notNull(), // Pending, In Progress, Completed, failed -> should update to enum
  ...lifecycleDates,
});

// export const tasksRelations = relations(tasks, ({ many }) => ({}));

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
