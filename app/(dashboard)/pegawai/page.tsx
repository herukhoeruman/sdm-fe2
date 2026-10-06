"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { UserGroupIcon } from "@hugeicons/core-free-icons";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetPegawaiQuery, useGetUsersQuery } from "@/lib/redux";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const MasterPegawaiPage = () => {
  const { data = [], isLoading, isError, refetch } = useGetPegawaiQuery();
  const needsRoles = data.some((pegawai) => !pegawai.roles);
  const users = useGetUsersQuery(undefined, { skip: !needsRoles });
  const rolesById = new Map(users.data?.map((user) => [user.id, user.roles]));
  const pegawaiWithRoles = data.map((pegawai) => ({
    ...pegawai,
    roles: pegawai.roles ?? rolesById.get(pegawai.id),
  }));

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
        <div className="space-y-2 rounded-xl border border-primary/15 bg-gradient-to-r from-accent to-card p-5 shadow-sm sm:p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <HugeiconsIcon icon={UserGroupIcon} size={20} strokeWidth={1.5} aria-hidden="true" />
            Manajemen SDM
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Data Pegawai</h1>
          <p className="text-sm text-muted-foreground">Kelola identitas, informasi pekerjaan, dan data pegawai.</p>
        </div>
        <section className="min-w-0 space-y-5 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
          {needsRoles && users.isError && (
            <div className="flex flex-wrap items-center gap-3 text-sm text-destructive" role="alert">
              Role pegawai gagal dimuat.
              <Button variant="outline" size="sm" onClick={() => users.refetch()}>Coba Lagi</Button>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
            <h2 className="text-lg font-semibold text-primary">Daftar Pegawai</h2>
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
            <DataTable columns={columns} data={pegawaiWithRoles} />
          )}
        </section>
      </div>
    </ScrollArea>
  );
};

export default MasterPegawaiPage;
