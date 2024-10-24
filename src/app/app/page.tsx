"use client"
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen, Send } from "lucide-react"
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
export default function AppPage() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  return (
    <div className="h-[calc(100vh-64px)] w-full bg-white">
      <Navbar />
      <div className="flex h-full">
        <div className={`transition-transform duration-300 ${isPanelOpen ? 'w-72 border-r-2 h-full p-4' : 'w-0 overflow-hidden'}`} >
          <div className="flex justify-between items-center">
            <button onClick={() => setIsPanelOpen(!isPanelOpen)} className="flex items-center justify-center w-8 h-8 p-0">
              {
                isPanelOpen ? <PanelLeftClose width={32} height={32} /> : ""
              }
            </button>
            <Button>
              New Task
            </Button>
          </div>
          <div className="mt-4">
            <h2 className="font-semibold text-lg">Task history</h2>
            <div className="p-2 flex">

            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 w-full h-full">
          {!isPanelOpen ? (
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsPanelOpen(!isPanelOpen)} className="flex items-center justify-center w-8 h-8 p-0">
                <PanelLeftOpen width={32} height={32} />
              </button>
              <Button>
                New Task
              </Button>
            </div>
          ) : ""}
          <div className="h-full flex flex-col justify-end px-4 py-2">
            <div className="flex-grow overflow-y-auto rounded-lg">
              
            </div>
            <div className="relative mt-2">
              <Textarea className="w-full h-24 text-lg border rounded-lg p-2" placeholder="Request a task..." />
              <div className="absolute right-2 bottom-2">
                <Button className="flex items-center justify-center   p-2">
                  <Send />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

