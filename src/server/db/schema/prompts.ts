import { relations } from "drizzle-orm";
import { json, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { generateId } from "@/lib/id";
import { lifecycleDates } from "@/server/lib/validations/utils";

export const prompts = pgTable("prompt", {
  id: varchar("id", { length: 32 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  userId: varchar("user_id", { length: 32 }).notNull(),
  taskId: varchar("task_id", { length: 32 }).notNull(),
  content: text("content").notNull(),
  ...lifecycleDates,
});

// export const promptRelations = relations(prompt, ({ many }) => ({}));

export type Prompt = typeof prompts.$inferSelect;
