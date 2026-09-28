"use client";

import { Loader2, Plus } from "lucide-react";
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
      <div className="space-y-6 p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-medium">KPI SDM</h1>
            <p className="text-sm text-muted-foreground">
              Hierarchy KPI perusahaan dan turunannya berdasarkan tahun.
            </p>
          </div>

          <div className="flex w-full items-end gap-2 sm:w-auto">
            <div className="w-full space-y-1 sm:w-36">
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
            <Button onClick={() => onOpen("sdm")}>
              <Plus className="mr-2 h-4 w-4" />
              Create KPI
            </Button>
          </div>
        </div>

        {isLoading || isFetching ? (
          <div className="flex h-48 items-center justify-center rounded-md border">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="rounded-md border border-destructive/50 p-8 text-center">
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
      </div>
    </ScrollArea>
  );
};

export default KpiSdmPage;
