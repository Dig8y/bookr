/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/CowzfwdSDEY
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import blackBookrLogo from "/public/icons/bookr-logo-black.svg"

export function Navbar() {
  return (
    <div className="w-full border-b-2">
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 text-black">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <BookrIcon className="h-12 w-12" />
          <span className="text-2xl font-semibold">Bookr</span>
        </Link>
        <div className="hidden lg:flex gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid w-[200px] p-4">
              <SignedOut>
                <SignInButton forceRedirectUrl={"/"} />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function BookrIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="514" height="514" viewBox="0 0 514 514" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="514" height="514" fill="white" />
      <path d="M117 273H317.856C362.118 273 398 308.817 398 353C398 397.183 362.118 433 317.856 433H197.144C152.882 433 117 397.183 117 353V273Z" fill="black" />
      <path d="M225.848 241C270.115 241 306 205.183 306 161C306 116.817 270.115 81 225.848 81H197.152H117V161C117 205.183 152.885 241 197.152 241H225.848Z" fill="black" />
    </svg>

  )
}