"use client";

import { Loader2 } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Target01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useKpiModal } from "@/hooks/use-kpi-modal";
import { useGetKpiDefinitionTreeQuery } from "@/lib/redux";
import { KpiTree } from "../_components/kpi-tree";

const currentYear = new Date().getFullYear();
const yearOptions = Array.from(
  { length: currentYear + 5 - 2000 + 1 },
  (_, index) => currentYear + 5 - index,
);

const KpiSdmPage = () => {
  const { onOpen } = useKpiModal();
  const [tahun, setTahun] = useState(currentYear);
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetKpiDefinitionTreeQuery(tahun);

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
        <div className="flex flex-col justify-between gap-5 rounded-xl border border-primary/15 bg-gradient-to-r from-accent to-card p-5 shadow-sm lg:flex-row lg:items-end sm:p-6">
          <div className="min-w-0 space-y-2">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <HugeiconsIcon icon={Target01Icon} size={20} strokeWidth={1.5} aria-hidden="true" />
              Kinerja Perusahaan
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">KPI SDM</h1>
            <p className="text-sm text-muted-foreground">
              Kelola hierarki KPI perusahaan dan turunannya berdasarkan tahun.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-end">
            <div className="w-full space-y-2 sm:w-36">
              <label htmlFor="kpi-year" className="text-sm font-medium">
                Tahun
              </label>
              <Select
                value={tahun.toString()}
                onValueChange={(value) => setTahun(Number(value))}
              >
                <SelectTrigger id="kpi-year">
                  <SelectValue placeholder="Pilih tahun" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full shrink-0 sm:w-auto" onClick={() => onOpen("sdm")}>
              <HugeiconsIcon icon={Add01Icon} size={18} strokeWidth={1.5} className="mr-2" aria-hidden="true" />
              Tambah KPI
            </Button>
          </div>
        </div>

        <section className="min-w-0 space-y-5 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-primary">Hierarki KPI</h2>
              <p className="text-sm text-muted-foreground">Klik panah pada KPI untuk melihat turunannya.</p>
            </div>
            <span className="w-fit rounded-lg bg-accent px-3 py-1 text-sm font-medium text-primary">Tahun {tahun}</span>
          </div>
        {isLoading || isFetching ? (
          <div className="flex h-48 items-center justify-center rounded-xl border bg-card">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-destructive/30 bg-card p-8 text-center">
            <p className="mb-4 text-sm text-destructive">
              Data hierarchy KPI gagal dimuat.
            </p>
            <Button variant="outline" onClick={() => refetch()}>
              Coba lagi
            </Button>
          </div>
        ) : (
          <KpiTree data={data} />
        )}
        </section>
      </div>
    </ScrollArea>
  );
};

export default KpiSdmPage;
