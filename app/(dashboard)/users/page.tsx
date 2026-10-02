"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { UserSettings01Icon } from "@hugeicons/core-free-icons";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetUsersQuery } from "@/lib/redux";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const UsersPage = () => {
  const { data = [], isLoading, isError, refetch } = useGetUsersQuery();

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
        <div className="space-y-2 rounded-xl border border-primary/15 bg-gradient-to-r from-accent to-card p-5 shadow-sm sm:p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <HugeiconsIcon icon={UserSettings01Icon} size={20} strokeWidth={1.5} aria-hidden="true" />
            Akses Pengguna
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Data Users</h1>
          <p className="text-sm text-muted-foreground">Kelola akun pengguna dan peran akses aplikasi.</p>
        </div>
        <section className="min-w-0 space-y-5 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
            <h2 className="text-lg font-semibold text-primary">Daftar Users</h2>
            {!isLoading && !isError && <span className="rounded-lg bg-accent px-3 py-1 text-sm font-medium text-primary">{data.length} data</span>}
          </div>
          {isLoading ? (
            <div role="status" className="flex h-40 items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
              Memuat data...
            </div>
          ) : isError ? (
            <div className="space-y-4 rounded-xl border border-destructive/30 p-6 text-center">
              <p className="text-sm text-destructive">Gagal memuat data.</p>
              <Button variant="outline" onClick={() => refetch()}>Coba Lagi</Button>
            </div>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </section>
      </div>
    </ScrollArea>
  );
};

export default UsersPage;
