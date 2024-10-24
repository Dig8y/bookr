import { db } from "@/server/db";
import { prompts, tasks } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const createPrompt = async (input: {
  userId: string;
  taskId: string;
  content: string;
}) => {
  try {
    if (!input.userId) {
      throw new Error("User ID is required");
    }

    const existingPrompt = await db
      .select()
      .from(prompts)
      .where(eq(prompts.taskId, input.taskId));

    if (existingPrompt) {
      throw new Error("A prompt for this task already exists");
    }

    const transaction = await db.transaction(async (trx) => {
      const promptInsertion = await trx
        .insert(prompts)
        .values({
          userId: input.userId,
          taskId: input.taskId,
          content: input.content,
        })

        .returning({ insertedId: tasks.id });
      return {
        promptInsertion,
      };

      // TODO: update task status, change task title & desc to match prompt content.
    });

    return {
      insertedId: transaction.promptInsertion[0]?.insertedId,
    };
  } catch (err) {
    console.log(err);
    return {
      data: [],
    };
  }
};
