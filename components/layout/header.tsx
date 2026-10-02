import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b border-primary/10 bg-card/95 shadow-sm shadow-primary/5 backdrop-blur z-20">
      <nav className="h-16 flex items-center justify-between px-4">
        <div className="hidden lg:block ml-4">
          <Link href="/">
            <Image
              src="/logo.png"
              width={75}
              height={47}
              alt="logo"
              className=""
            />
          </Link>
        </div>
        {/* <div>{JSON.stringify(initialData)}</div> */}
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserNav />
        </div>
      </nav>
    </div>
  );
};
