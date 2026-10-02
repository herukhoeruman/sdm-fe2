import { DashboardNav } from "@/components/layout/dashboard-nav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  return (
    <nav
      className={cn(`relative hidden h-screen w-72 shrink-0 border-r bg-card pt-16 lg:block`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Menu Utama
            </p>
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};
