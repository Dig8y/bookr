import { relations } from "drizzle-orm"
import { pgTable, text, varchar } from "drizzle-orm/pg-core"

import { generateId } from "@/lib/id"
import { lifecycleDates } from "./utils"

export const tasks = pgTable("tasks", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  taskTypeId: text("task_type_id").notNull().unique(),
  ...lifecycleDates,
})

export const tasksRelations = relations(tasks, ({ many }) => ({
}))

export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert
