// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ChevronDown } from "lucide-react";

// import { Icons } from "@/components/icons";
// import { cn } from "@/lib/utils";
// import { NavItem } from "@/types";
// import { Dispatch, SetStateAction, useState } from "react";
// import { useGetMeQuery } from "@/lib/redux";

// interface DashboardNavProps {
//   items: NavItem[];
//   setOpen?: Dispatch<SetStateAction<boolean>>;
// }

// const userRoutes: NavItem[] = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//     icon: "dashboard",
//     label: "Dashboard",
//   },
//   {
//     title: "Penilaian",
//     href: "/penilaian",
//     icon: "penilaian",
//     label: "Penilaian",
//   },
// ];

// type DashboardNavItem = NavItem & { items?: NavItem[] };

// const sdmRoutes: DashboardNavItem[] = [
//   {
//     title: "KPI",
//     icon: "kpi",
//     label: "KPI",
//     items: [
//       {
//         title: "KPI Pegawai",
//         href: "/kpi/pegawai",
//         label: "KPI Pegawai",
//       },
//       {
//         title: "KPI SDM",
//         href: "/kpi/sdm",
//         label: "KPI SDM",
//       },
//     ],
//   },
//   {
//     title: "Generate Penilai",
//     href: "/generator",
//     icon: "generate",
//     label: "Generate Penilai",
//   },

//   {
//     title: "Laporan",
//     href: "/laporan",
//     icon: "report",
//     label: "Laporan",
//   },
//   {
//     title: "Pegawai",
//     href: "/pegawai",
//     icon: "users",
//     label: "Pegawai",
//   },
// ];

// const adminRoutes: NavItem[] = [
//   {
//     title: "Users",
//     href: "/users",
//     icon: "userCog",
//     label: "Users",
//   },
// ];

// export function DashboardNav({ items, setOpen }: DashboardNavProps) {
//   const path = usePathname();
//   const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
//     KPI: path.startsWith("/kpi"),
//   });

//   const { data: me } = useGetMeQuery();

//   const isUser = me?.roles?.includes("ROLE_USER");
//   const isAdmin = me?.roles?.includes("ROLE_ADMIN");
//   const isSdm = me?.roles?.includes("ROLE_SDM");

//   if (!items?.length) return null;

//   return (
//     <nav className="grid items-start gap-2">
//       {isUser &&
//         userRoutes.map((item, index) => {
//           const Icon = Icons[item.icon || "arrowRight"];
//           return (
//             item.href && (
//               <Link
//                 key={index}
//                 href={item.disabled ? "/" : item.href}
//                 onClick={() => {
//                   if (setOpen) setOpen(false);
//                 }}
//               >
//                 <span
//                   className={cn(
//                     "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
//                     path === item.href ? "bg-accent" : "transparent",
//                     item.disabled && "cursor-not-allowed opacity-80"
//                   )}
//                 >
//                   <Icon className="mr-2 h-4 w-4" />
//                   <span>{item.title}</span>
//                 </span>
//               </Link>
//             )
//           );
//         })}

//       {isSdm &&
//         sdmRoutes.map((item, index) => {
//           const Icon = Icons[item.icon || "arrowRight"];

//           if (item.items?.length) {
//             const isOpen = openSubmenus[item.title] ?? false;
//             const isActive = item.items.some(
//               (child) => child.href && path.startsWith(child.href),
//             );

//             return (
//               <div key={item.title} className="space-y-1">
//                 <button
//                   type="button"
//                   aria-expanded={isOpen}
//                   className={cn(
//                     "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
//                     isActive && "bg-accent",
//                   )}
//                   onClick={() =>
//                     setOpenSubmenus((current) => ({
//                       ...current,
//                       [item.title]: !isOpen,
//                     }))
//                   }
//                 >
//                   <Icon className="mr-2 h-4 w-4" />
//                   <span className="flex-1 text-left">{item.title}</span>
//                   <ChevronDown
//                     className={cn(
//                       "h-4 w-4 transition-transform",
//                       isOpen && "rotate-180",
//                     )}
//                   />
//                 </button>

//                 {isOpen && (
//                   <div className="ml-5 space-y-1 border-l pl-3">
//                     {item.items.map((child) =>
//                       child.href ? (
//                         <Link
//                           key={child.href}
//                           href={child.href}
//                           onClick={() => setOpen?.(false)}
//                           className={cn(
//                             "block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground",
//                             path === child.href &&
//                               "bg-accent font-medium text-accent-foreground",
//                           )}
//                         >
//                           {child.title}
//                         </Link>
//                       ) : null,
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           }

//           return (
//             item.href && (
//               <Link
//                 key={index}
//                 href={item.disabled ? "/" : item.href}
//                 onClick={() => {
//                   if (setOpen) setOpen(false);
//                 }}
//               >
//                 <span
//                   className={cn(
//                     "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
//                     path === item.href ? "bg-accent" : "transparent",
//                     item.disabled && "cursor-not-allowed opacity-80"
//                   )}
//                 >
//                   <Icon className="mr-2 h-4 w-4" />
//                   <span>{item.title}</span>
//                 </span>
//               </Link>
//             )
//           );
//         })}

//       {isAdmin &&
//         adminRoutes.map((item, index) => {
//           const Icon = Icons[item.icon || "arrowRight"];
//           return (
//             item.href && (
//               <Link
//                 key={index}
//                 href={item.disabled ? "/" : item.href}
//                 onClick={() => {
//                   if (setOpen) setOpen(false);
//                 }}
//               >
//                 <span
//                   className={cn(
//                     "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
//                     path === item.href ? "bg-accent" : "transparent",
//                     item.disabled && "cursor-not-allowed opacity-80"
//                   )}
//                 >
//                   <Icon className="mr-2 h-4 w-4" />
//                   <span>{item.title}</span>
//                 </span>
//               </Link>
//             )
//           );
//         })}
//     </nav>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { Icons } from "@/components/icons";
// import { cn } from "@/lib/utils";
// import { NavItem } from "@/types";
// import { Dispatch, SetStateAction } from "react";
// import { useGetMeQuery } from "@/lib/redux";

// interface DashboardNavProps {
//   items: NavItem[];
//   setOpen?: Dispatch<SetStateAction<boolean>>;
// }

// const userRoutes: NavItem[] = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//     icon: "dashboard",
//     label: "Dashboard",
//   },
//   {
//     title: "Penilaian",
//     href: "/penilaian",
//     icon: "penilaian",
//     label: "Penilaian",
//   },
//   {
//     title: "KPI Pegawai",
//     href: "/kpi/pegawai",
//     icon: "kpi",
//     label: "KPI Pegawai",
//   },
// ];

// const sdmRoutes: NavItem[] = [
//   { title: "KPI SDM", href: "/kpi/sdm", icon: "kpi", label: "KPI SDM" },
//   {
//     title: "Generate Penilai",
//     href: "/generator",
//     icon: "generate",
//     label: "Generate Penilai",
//   },
//   { title: "Laporan", href: "/laporan", icon: "report", label: "Laporan" },
//   { title: "Pegawai", href: "/pegawai", icon: "users", label: "Pegawai" },
// ];

// const adminRoutes: NavItem[] = [
//   { title: "Users", href: "/users", icon: "userCog", label: "Users" },
// ];

// function renderRoute(
//   item: NavItem,
//   index: number,
//   path: string,
//   setOpen?: Dispatch<SetStateAction<boolean>>,
// ) {
//   const Icon = Icons[item.icon || "arrowRight"];
//   return (
//     item.href && (
//       <Link
//         key={index}
//         href={item.disabled ? "/" : item.href}
//         onClick={() => setOpen?.(false)}
//       >
//         <span
//           className={cn(
//             "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
//             path === item.href ? "bg-accent" : "transparent",
//             item.disabled && "cursor-not-allowed opacity-80",
//           )}
//         >
//           <Icon className="mr-2 h-4 w-4" />
//           <span>{item.title}</span>
//         </span>
//       </Link>
//     )
//   );
// }

// export function DashboardNav({ items, setOpen }: DashboardNavProps) {
//   const path = usePathname();
//   const { data: me } = useGetMeQuery();

//   const isUser = me?.roles?.includes("ROLE_USER");
//   const isAdmin = me?.roles?.includes("ROLE_ADMIN");
//   const isSdm = me?.roles?.includes("ROLE_SDM");

//   if (!items?.length) return null;

//   return (
//     <nav className="grid items-start gap-2">
//       {isUser &&
//         userRoutes.map((item, index) =>
//           renderRoute(item, index, path, setOpen),
//         )}
//       {isSdm &&
//         sdmRoutes.map((item, index) => renderRoute(item, index, path, setOpen))}
//       {isAdmin &&
//         adminRoutes.map((item, index) =>
//           renderRoute(item, index, path, setOpen),
//         )}
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  DashboardSquare01Icon,
  File02Icon,
  FileAddIcon,
  Target01Icon,
  Task01Icon,
  UserGroupIcon,
  UserSettings01Icon,
} from "@hugeicons/core-free-icons";
import { Dispatch, SetStateAction, useState } from "react";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { useGetMeQuery } from "@/lib/redux";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const navigationIcons = {
  dashboard: DashboardSquare01Icon,
  penilaian: Task01Icon,
  kpi: Target01Icon,
  generate: FileAddIcon,
  report: File02Icon,
  users: UserGroupIcon,
  userCog: UserSettings01Icon,
};

type Role = "ROLE_USER" | "ROLE_SDM" | "ROLE_ADMIN";

type DashboardNavItem = NavItem & {
  roles?: Role[];
  items?: DashboardNavItem[];
};

const routes: DashboardNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
    roles: ["ROLE_USER", "ROLE_SDM", "ROLE_ADMIN"],
  },
  {
    title: "Penilaian",
    href: "/penilaian",
    icon: "penilaian",
    label: "Penilaian",
    roles: ["ROLE_USER", "ROLE_SDM"],
  },
  {
    title: "KPI",
    icon: "kpi",
    label: "KPI",
    roles: ["ROLE_SDM", "ROLE_USER"],
    items: [
      {
        title: "KPI Pegawai",
        href: "/kpi/pegawai",
        label: "KPI Pegawai",
        roles: ["ROLE_USER"],
      },
      {
        title: "KPI SDM",
        href: "/kpi/sdm",
        label: "KPI SDM",
        roles: ["ROLE_SDM"],
      },
    ],
  },
  {
    title: "Generate Penilai",
    href: "/generator",
    icon: "generate",
    label: "Generate Penilai",
    roles: ["ROLE_SDM"],
  },
  {
    title: "Laporan",
    href: "/laporan",
    icon: "report",
    label: "Laporan",
    roles: ["ROLE_SDM"],
  },
  {
    title: "Pegawai",
    href: "/pegawai",
    icon: "users",
    label: "Pegawai",
    roles: ["ROLE_SDM"],
  },
  // {
  //   title: "Users",
  //   href: "/users",
  //   icon: "userCog",
  //   label: "Users",
  //   roles: ["ROLE_ADMIN"],
  // },
];

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();

  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    KPI: path.startsWith("/kpi"),
  });

  const { data: me } = useGetMeQuery();

  if (!items?.length) return null;

  const userRoles = (me?.roles ?? []) as Role[];

  const hasAccess = (roles?: Role[]) => {
    if (!roles?.length) return true;

    return roles.some((role) => userRoles.includes(role));
  };

  const renderMenuItem = (item: DashboardNavItem, index: number) => {
    // Filter berdasarkan role
    if (!hasAccess(item.roles)) {
      return null;
    }

    const icon =
      navigationIcons[item.icon as keyof typeof navigationIcons] ??
      ArrowRight01Icon;

    // =========================
    // Menu dengan submenu
    // =========================
    if (item.items?.length) {
      const accessibleChildren = item.items.filter((child) =>
        hasAccess(child.roles),
      );

      // Jangan tampilkan parent jika tidak ada child yang bisa diakses
      if (!accessibleChildren.length) {
        return null;
      }

      const isOpen = openSubmenus[item.title] ?? false;

      const isActive = accessibleChildren.some(
        (child) => child.href && path.startsWith(child.href),
      );

      return (
        <div key={item.title} className="space-y-1">
          <button
            type="button"
            aria-expanded={isOpen}
            className={cn(
              "group flex w-full items-center rounded-lg border-l-4 border-transparent px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-accent-foreground",
              isActive && "border-primary bg-accent text-accent-foreground",
            )}
            onClick={() =>
              setOpenSubmenus((current) => ({
                ...current,
                [item.title]: !isOpen,
              }))
            }
          >
            <HugeiconsIcon
              icon={icon}
              size={20}
              strokeWidth={1.5}
              className="mr-2 shrink-0"
              aria-hidden="true"
            />

            <span className="flex-1 text-left">{item.title}</span>

            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={16}
              strokeWidth={1.5}
              aria-hidden="true"
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </button>

          {isOpen && (
            <div className="ml-5 space-y-1 border-l pl-3">
              {accessibleChildren.map((child) => {
                if (!child.href) return null;

                return (
                  <Link
                    key={child.href}
                    href={child.disabled ? "/" : child.href}
                    onClick={() => setOpen?.(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      path === child.href &&
                        "bg-accent font-semibold text-accent-foreground",
                      child.disabled && "cursor-not-allowed opacity-80",
                    )}
                  >
                    {child.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // =========================
    // Menu biasa
    // =========================
    if (!item.href) {
      return null;
    }

    return (
      <Link
        key={item.href || index}
        href={item.disabled ? "/" : item.href}
        onClick={() => setOpen?.(false)}
      >
        <span
          className={cn(
            "group flex items-center rounded-lg border-l-4 border-transparent px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-accent-foreground",
            (path === item.href || path.startsWith(`${item.href}/`)) &&
              "border-primary bg-accent text-accent-foreground",
            item.disabled && "cursor-not-allowed opacity-80",
          )}
        >
          <HugeiconsIcon
            icon={icon}
            size={20}
            strokeWidth={1.5}
            className="mr-2 shrink-0"
            aria-hidden="true"
          />

          <span>{item.title}</span>
        </span>
      </Link>
    );
  };

  return (
    <nav className="grid items-start gap-2">{routes.map(renderMenuItem)}</nav>
  );
}
