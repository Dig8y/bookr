"use client"

import { currentUser, User } from "@clerk/nextjs/server";
import { getTasks } from "@/server/lib/queries/task";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
export default function Page() {

  return (
    <>
      <div className="flex flex-col p-4 w-full h-full">
        <div className="h-full flex flex-col justify-end px-4 py-2">
          <div className="flex-grow overflow-y-auto rounded-lg">
            CREATE SOME TASKS
          </div>
          <div className="relative mt-2">
            {/* <Textarea className="w-full h-24 text-lg border rounded-lg p-2" placeholder="Request a task..." />
            <div className="absolute right-2 bottom-2">
              <Button className="flex items-center justify-center   p-2">
                <Send />
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

