"use client";

import { Loader2 } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Target01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useKpiModal } from "@/hooks/use-kpi-modal";
import { useGetKpiDefinitionsQuery, useGetMeQuery } from "@/lib/redux";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const KpiPage = () => {
  const { onOpen } = useKpiModal();
  const currentYear = new Date().getFullYear();

  const {
    data: me,
    isLoading: isLoadingMe,
    isError: isMeError,
    refetch: refetchMe,
  } = useGetMeQuery();

  const ownerId = me?.id ?? 0;
  const parentOwnerId = me?.parent ?? 0;

  const {
    data: ownKpiDefinitions = [],
    isLoading: isLoadingOwnKpi,
    isError: isOwnKpiError,
    refetch: refetchOwnKpi,
  } = useGetKpiDefinitionsQuery(
    {
      ownerId,
      tahun: currentYear,
    },
    { skip: !ownerId },
  );

  const {
    data: parentKpiDefinitions = [],
    isLoading: isLoadingParentKpi,
    isError: isParentKpiError,
    refetch: refetchParentKpi,
  } = useGetKpiDefinitionsQuery(
    {
      ownerId: parentOwnerId,
      tahun: currentYear,
    },
    { skip: !parentOwnerId },
  );

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
        <div className="flex flex-col gap-5 rounded-xl border border-primary/15 bg-gradient-to-r from-accent to-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="min-w-0 space-y-2">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <HugeiconsIcon icon={Target01Icon} size={20} strokeWidth={1.5} aria-hidden="true" />
              Kinerja Pegawai
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">KPI Pegawai</h1>
            <p className="text-sm text-muted-foreground">
              Kelola definisi Key Performance Indicator {me?.nama ?? ""} untuk
              tahun {currentYear}.
            </p>
          </div>
          <Button className="w-full shrink-0 sm:w-auto" disabled={!me || isMeError} onClick={() => onOpen("pegawai")}>
            <HugeiconsIcon icon={Add01Icon} size={18} strokeWidth={1.5} className="mr-2" aria-hidden="true" />
            Tambah KPI
          </Button>
        </div>

        <Tabs defaultValue="kpi-atasan" className="w-full min-w-0 space-y-5">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-1 rounded-xl border bg-accent/50 p-1 sm:w-80">
            <TabsTrigger className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm" value="kpi-atasan">KPI Atasan</TabsTrigger>
            <TabsTrigger className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm" value="kpi-saya">KPI Saya</TabsTrigger>
          </TabsList>

          {isLoadingMe ? (
            <div className="flex h-40 items-center justify-center rounded-xl border bg-card">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : isMeError || !me ? (
            <div className="rounded-xl border border-destructive/30 bg-card p-8 text-center">
              <p className="mb-4 text-sm text-destructive">
                Data pegawai untuk user aktif tidak ditemukan.
              </p>
              <Button variant="outline" onClick={() => refetchMe()}>
                Coba lagi
              </Button>
            </div>
          ) : (
            <div className="min-w-0">
              <TabsContent className="mt-0 min-w-0" value="kpi-atasan">
                <section className="min-w-0 space-y-5 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
                  <div className="space-y-1 border-b pb-4">
                    <h2 className="text-lg font-semibold text-primary">KPI Atasan</h2>
                    <p className="text-sm text-muted-foreground">
                      {parentOwnerId
                        ? `KPI milik Atasan untuk tahun ${currentYear}.`
                        : "Anda tidak memiliki parent/atasan."}
                    </p>
                  </div>

                  {!parentOwnerId ? (
                    <div className="rounded-xl border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
                      Data KPI atasan tidak tersedia.
                    </div>
                  ) : isLoadingParentKpi ? (
                    <div className="flex h-32 items-center justify-center rounded-xl border bg-card">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : isParentKpiError ? (
                    <div className="rounded-xl border border-destructive/30 bg-card p-6 text-center">
                      <p className="mb-3 text-sm text-destructive">
                        KPI atasan gagal dimuat.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => refetchParentKpi()}
                      >
                        Coba lagi
                      </Button>
                    </div>
                  ) : (
                    <DataTable columns={columns} data={parentKpiDefinitions} />
                  )}
                </section>
              </TabsContent>

              <TabsContent className="mt-0 min-w-0" value="kpi-saya">
                <section className="min-w-0 space-y-5 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
                  <div className="space-y-1 border-b pb-4">
                    <h2 className="text-lg font-semibold text-primary">KPI Saya</h2>
                    <p className="text-sm text-muted-foreground">
                      KPI milik {me.nama} untuk tahun {currentYear}.
                    </p>
                  </div>

                  {isLoadingOwnKpi ? (
                    <div className="flex h-32 items-center justify-center rounded-xl border bg-card">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : isOwnKpiError ? (
                    <div className="rounded-xl border border-destructive/30 bg-card p-6 text-center">
                      <p className="mb-3 text-sm text-destructive">
                        KPI sendiri gagal dimuat.
                      </p>
                      <Button variant="outline" onClick={() => refetchOwnKpi()}>
                        Coba lagi
                      </Button>
                    </div>
                  ) : (
                    <DataTable columns={columns} data={ownKpiDefinitions} />
                  )}
                </section>
              </TabsContent>
            </div>
          )}
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default KpiPage;
