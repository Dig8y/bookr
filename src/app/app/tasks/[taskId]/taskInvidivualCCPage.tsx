"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createPrompt } from "@/server/lib/actions/prompt"


const promptFormSchema = z.object({
  content: z.string().min(5),
  taskId: z.string(),
  userId: z.string(),
})


export default function TaskIndividualCCPage({
  task
}: {
  task: {
    id: string
    title: string
    description: string
  }
}) {
  const { userId } = useAuth()
  const router = useRouter()


  const form = useForm<z.infer<typeof promptFormSchema>>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: {
      content: "",
      taskId: task.id,
      userId: userId ?? "",
    },
  })

  async function onSubmit(data: z.infer<typeof promptFormSchema>) {

    console.log(data)

    form.reset()
    const insertedPrompt = await createPrompt(data)
  }


  return (
    <div className="flex flex-col p-4 w-full h-full">
      <div className="flex-grow overflow-y-auto rounded-lg">
        <h1 className="text-xl font-bold">{task.title}</h1>
      </div>
      <div className="h-full flex flex-col justify-end px-24 py-2">
        <div className="relative my-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea className="w-full h-24 text-lg border rounded-lg p-2" placeholder="Request a task..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="absolute flex items-center justify-center   p-2">
                <Send />
              </Button>
            </form>
          </Form>

        </div>
      </div>
    </div>
  )
}