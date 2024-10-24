import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getTasks } from "@/server/lib/queries/task";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: { children: React.ReactNode }) {

  const user = await currentUser()

  if (!user) {
    return null;
  }
  const tasks = await getTasks({ userId: user.id });


  return (
    <div className="relative h-[calc(100vh-64px)] w-full bg-white">
      <Navbar />
      <Sidebar tasks={tasks.data} >
        {children}
      </Sidebar>

    </div>
  );
}