import { relations } from "drizzle-orm"
import { pgTable, text, varchar } from "drizzle-orm/pg-core"

import { generateId } from "@/lib/id"
import { lifecycleDates } from "./utils"

export const callLogs = pgTable("callLogs", {
  id: varchar("id", { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
})

export const callLogsRelations = relations(callLogs, ({ many }) => ({
}))

export type CallLog = typeof callLogs.$inferSelect
export type NewCallLog = typeof callLogs.$inferInsert
