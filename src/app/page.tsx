"use client"
import { Navbar } from "@/components/navbar";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";


export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  if (isSignedIn) {
    router.push("/app");
  }

  return (
    <>
      <Navbar />
      <h1>Home</h1>

    </>
  )

}
