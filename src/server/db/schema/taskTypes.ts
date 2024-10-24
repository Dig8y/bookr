import { relations } from "drizzle-orm"
import { pgTable, text, varchar } from "drizzle-orm/pg-core"

import { generateId } from "@/lib/id"
import { lifecycleDates } from "./utils"

export const taskTypes = pgTable("taskTypes", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  name: text("name").notNull().unique(),
  systemPrompt: text("system_prompt").notNull(),
  userPrompt: text("user_prompt").notNull(),
  ...lifecycleDates,
})

export const taskTypesRelations = relations(taskTypes, ({ many }) => ({
}))

export type TaskType = typeof taskTypes.$inferSelect
export type NewTaskType = typeof taskTypes.$inferInsert
