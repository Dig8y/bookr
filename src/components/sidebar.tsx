"use client"
import { PanelLeftClose, PanelLeftOpen, Send } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react";
import { Textarea } from "./ui/textarea";

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@clerk/nextjs";
import { createTask } from "@/server/lib/actions/task";
import { Form } from "./ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";



export default function Sidebar({
  tasks,
  children
}: {
  tasks: {
    id: string;
    title: string;
    description: string;
  }[],
  children: React.ReactNode
}) {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const router = useRouter()
  const [taskList, setTaskList] = useState(tasks); // Use state for tasks
  const { userId } = useAuth()

  if (!userId) {
    return null
  }

  async function createPost() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    if (!userId) {
      return
    }
    const createdTask = await createTask({
      "userId": userId
    })
    setTaskList((prevTasks) => [
      {
        id: createdTask.insertedId ?? "",
        title: "New Task",
        description: "",
      }, ...prevTasks
    ]);
    router.push(`/app/tasks/${createdTask.insertedId}`)
    revalidatePath(`/app`)
  }


  return (<div className="flex h-full">
    <div className={`transition-transform duration-300 ${isPanelOpen ? 'w-72 border-r-2 h-full p-4' : 'w-0 overflow-hidden'}`} >
      <div className="flex justify-between items-center">
        <button onClick={() => setIsPanelOpen(!isPanelOpen)} className="flex items-center justify-center w-8 h-8 p-0">
          {
            isPanelOpen ? <PanelLeftClose width={32} height={32} /> : ""
          }
        </button>

        <Button onClick={async () => {
          createPost().catch(console.error)

        }}>New Task</Button>
      </div>
      <div className="mt-4">
        <h2 className="font-semibold text-lg">Task history</h2>
        <div className="yp-2 flex flex-col space-y-2">
          {
            taskList.map((task) => (
              <Link key={task.id} href={`/app/tasks/${task.id}`} className="flex items-center gap-2 p-2 w-full border rounded-lg">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
    {
      children
    }
  </div >
  )
};