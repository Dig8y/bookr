import { relations } from "drizzle-orm"
import { pgTable, text, varchar } from "drizzle-orm/pg-core"

import { generateId } from "@/lib/id"
import { lifecycleDates } from "./utils"

export const taskExecutions = pgTable("taskExecutions", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  
})

export const taskExecutionsRelations = relations(taskExecutions, ({ many }) => ({
}))

export type TaskExecution = typeof taskExecutions.$inferSelect
export type NewTaskExecution = typeof taskExecutions.$inferInsert
