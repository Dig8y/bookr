import { db } from "@/server/db";
import { tasks } from "@/server/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

export async function getTasks(input: { userId: string }) {
  noStore();
  try {
    const data = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.status,
      })
      .from(tasks)
      .where(eq(tasks.userId, input.userId))
      .orderBy(desc(tasks.createdAt))
      .limit(10);

    return {
      data,
    };
  } catch (err) {
    console.log(err);
    return {
      data: [],
    };
  }
}

export async function getTask(input: { userId: string; taskId: string }) {
  noStore();
  try {
    const data = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.status,
      })
      .from(tasks)
      .where(and(eq(tasks.userId, input.userId), eq(tasks.id, input.taskId)));

    return {
      data: data
    }
  } catch (err) {
    console.log(err);
    return {
      data: [],
    };
  }
}
