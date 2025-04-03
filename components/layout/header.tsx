"use client"; // Needed for UserButton

    import Link from "next/link";
    import { UserButton } from "@clerk/nextjs";
    import { Button } from "@/components/ui/button"; // Assuming you might want buttons later

    export function Header() {
      return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 max-w-screen-2xl items-center">
            <div className="mr-4 hidden md:flex">
              <Link href="/app" className="mr-6 flex items-center space-x-2">
                {/* Add Logo here if you have one */}
                <span className="hidden font-bold sm:inline-block">ForgeKit App</span>
              </Link>
              <nav className="flex items-center gap-6 text-sm">
                {/* Add Navigation Links Here */}
                {/* Example:
                <Link
                  href="/app/templates"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Templates
                </Link>
                 <Link
                  href="/app/jobs"
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  Jobs
                </Link> */}
              </nav>
            </div>
            {/* Add mobile navigation toggle here if needed */}
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center">
                <UserButton afterSignOutUrl="/" />
              </nav>
            </div>
          </div>
        </header>
      );
    }
