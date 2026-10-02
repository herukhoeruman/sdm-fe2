"use client";

import { DashboardNav } from "@/components/layout/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/constants/data";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Buka menu navigasi">
            <HugeiconsIcon icon={Menu01Icon} size={24} strokeWidth={1.5} aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              {/* <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2> */}
              <div className="space-y-1">
                <DashboardNav items={navItems} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
