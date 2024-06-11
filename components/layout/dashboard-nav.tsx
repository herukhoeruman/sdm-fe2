"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "@/lib/redux";
import Loading from "@/app/loading";
import toast from "react-hot-toast";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const userRoutes: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Penilaian",
    href: "/penilaian",
    icon: "penilaian",
    label: "Penilaian",
  },
];

const sdmRoutes: NavItem[] = [
  {
    title: "Generate Penilai",
    href: "/generator",
    icon: "generate",
    label: "Generate Penilai",
  },

  {
    title: "Laporan",
    href: "/laporan",
    icon: "report",
    label: "Laporan",
  },
];

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();
  const router = useRouter();

  const { data: me, error, loading } = useSelector((state) => state.getme);

  if (error) {
    toast.error("Silahkan login terlebih dahulu");
    console.log(error);
    // router.push("/");
  }

  const isUser = me?.roles?.includes("ROLE_USER");
  const isAdmin = me?.roles?.includes("ROLE_ADMIN");
  const isSdm = me?.roles?.includes("ROLE_SDM");

  if (!items?.length) return null;

  return (
    <nav className="grid items-start gap-2">
      {isUser &&
        userRoutes.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            item.href && (
              <Link
                key={index}
                href={item.disabled ? "/" : item.href}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === item.href ? "bg-accent" : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </span>
              </Link>
            )
          );
        })}

      {isSdm &&
        sdmRoutes.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            item.href && (
              <Link
                key={index}
                href={item.disabled ? "/" : item.href}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === item.href ? "bg-accent" : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </span>
              </Link>
            )
          );
        })}

      {/* {isAdmin &&
        items.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            item.href && (
              <Link
                key={index}
                href={item.disabled ? "/" : item.href}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === item.href ? "bg-accent" : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </span>
              </Link>
            )
          );
        })} */}
    </nav>
  );
}
