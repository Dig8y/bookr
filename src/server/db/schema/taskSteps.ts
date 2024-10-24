import { relations } from "drizzle-orm";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { generateId } from "@/lib/id";
import { lifecycleDates } from "../../lib/validations/utils";

export const taskSteps = pgTable("taskSteps", {
  id: varchar("id", { length: 32 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  taskId: varchar("task_id", { length: 32 }).notNull(),
  description: text("description").notNull(),
  sequenceNumber: integer("sequence_number").notNull(),
  status: varchar("status", { length: 32 }).default("Pending").notNull(), // Pending, In Progress, Completed, failed -> should update to enum
  ...lifecycleDates,
});

// export const taskStepsRelations = relations(taskSteps, ({ many }) => ({}));

export type TaskExecution = typeof taskSteps.$inferSelect;
export type NewTaskExecution = typeof taskSteps.$inferInsert;
