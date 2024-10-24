import { db } from "@/server/db";
import { tasks } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export const createTask = async (input: { userId: string }) => {
  try {
    const data = await db
      .insert(tasks)
      .values({
        userId: input.userId,
      })
      .returning({ insertedId: tasks.id });

    return {
      insertedId: data[0]?.insertedId,
    };
  } catch (err) {
    console.log(err);
    return {
      data: [],
    };
  }
};
