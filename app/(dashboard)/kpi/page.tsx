"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useKpiModal } from "@/hooks/use-kpi-modal";

const KpiPage = () => {
  const { onOpen } = useKpiModal();

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-medium">KPI</h1>
            <p className="text-sm text-muted-foreground">
              Kelola definisi Key Performance Indicator.
            </p>
          </div>
          <Button onClick={onOpen}>
            <Plus className="mr-2 h-4 w-4" />
            Create KPI
          </Button>
        </div>

        <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
          Gunakan tombol Create KPI untuk menambahkan definisi KPI baru.
        </div>
      </div>
    </ScrollArea>
  );
};

export default KpiPage;
