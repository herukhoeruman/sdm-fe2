"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { KpiDefinitionPayload } from "@/lib/redux";

const SortableHeader = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <Button variant="ghost" className="-ml-3 h-8" onClick={onClick}>
    {label}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

export const columns: ColumnDef<KpiDefinitionPayload>[] = [
  {
    id: "number",
    header: "No",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
  },
  {
    accessorKey: "kpiCode",
    header: ({ column }) => (
      <SortableHeader
        label="Kode"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader
        label="Nama KPI"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <div className="min-w-[220px]">
        <p className="font-medium">{row.original.name}</p>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {row.original.description}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "weight",
    header: "Bobot",
    cell: ({ getValue }) => `${getValue<number>()}%`,
  },
  {
    accessorKey: "cascadeRatio",
    header: "Cascade Ratio",
    cell: ({ getValue }) => `${getValue<number>()}%`,
  },
  {
    accessorKey: "tahun",
    header: ({ column }) => (
      <SortableHeader
        label="Tahun"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
  },
  {
    accessorKey: "parentKpiId",
    header: "Parent KPI",
    cell: ({ getValue }) => getValue<number | null>() ?? "-",
  },
];
