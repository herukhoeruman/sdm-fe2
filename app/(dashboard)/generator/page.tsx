"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { FileAddIcon } from "@hugeicons/core-free-icons";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetSdmProcessesQuery } from "@/lib/redux";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { ProsesPertanyaanForm } from "./_components/proses-pertanyaan-form";

const PertanyaanPage = () => {
  const { data = [], isLoading, isError, refetch } = useGetSdmProcessesQuery();

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
        <div className="space-y-2 rounded-xl border border-primary/15 bg-gradient-to-r from-accent to-card p-5 shadow-sm sm:p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <HugeiconsIcon
              icon={FileAddIcon}
              size={20}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            Proses Penilaian
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Generate Penilai
          </h1>
          <p className="text-sm text-muted-foreground">
            Atur periode dan jatuh tempo, lalu pantau riwayat generate penilai.
          </p>
        </div>
        <section className="space-y-5 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
          <div className="space-y-1 border-b pb-4">
            <h2 className="text-lg font-semibold text-primary">
              Pengaturan Generate
            </h2>
            <p className="text-sm text-muted-foreground">
              Tentukan tahun, semester, dan batas waktu penilaian.
            </p>
          </div>
          <ProsesPertanyaanForm onSubmitSuccess={() => undefined} />
        </section>
        <section className="min-w-0 space-y-5 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
            <h2 className="text-lg font-semibold text-primary">
              Riwayat Generate
            </h2>
            {!isLoading && !isError && (
              <span className="rounded-lg bg-accent px-3 py-1 text-sm font-medium text-primary">
                {data.length} data
              </span>
            )}
          </div>
          {isLoading ? (
            <div
              role="status"
              className="flex h-40 items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <Loader2
                className="h-5 w-5 animate-spin text-primary"
                aria-hidden="true"
              />
              Memuat data...
            </div>
          ) : isError ? (
            <div className="space-y-4 rounded-xl border border-destructive/30 p-6 text-center">
              <p className="text-sm text-destructive">Gagal memuat data.</p>
              <Button variant="outline" onClick={() => refetch()}>
                Coba Lagi
              </Button>
            </div>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </section>
      </div>
    </ScrollArea>
  );
};

export default PertanyaanPage;
