import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getTask } from "@/server/lib/queries/task";
import { currentUser } from "@clerk/nextjs/server";
import { Send } from "lucide-react";
import TaskIndividualCCPage from "./taskInvidivualCCPage";

export default async function Page({
  params
}: {
  params: {
    taskId: string;
  }
}) {

  const user = await currentUser();

  if (!user) {
    return null;
  }

  const task = await getTask({ userId: user.id, taskId: params.taskId });

  if (!task.data[0]) {
    return <div>TASK NOT FOUND</div>;
  }

  console.log(task.data)
  return (
    <>
      <TaskIndividualCCPage task={task.data[0]} />
    </>
  );
}

