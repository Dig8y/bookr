import { relations } from "drizzle-orm"
import { pgTable, text, varchar } from "drizzle-orm/pg-core"

import { generateId } from "@/lib/id"
import { lifecycleDates } from "../../lib/validations/utils"

export const message = pgTable("message", {
  id: varchar("id", { length: 32 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  taskId: varchar("task_id", { length: 32 }).notNull(),
  sender: varchar("sender", { length: 32 }).notNull(),
})

// export const messageRelations = relations(message, ({ many }) => ({
// }))

export type MessageType = typeof message.$inferSelect
export type NewMessageType = typeof message.$inferInsert
