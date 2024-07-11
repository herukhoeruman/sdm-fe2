"use client";

import jsPDF from "jspdf";
import "jspdf-autotable";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { FileText, Tally1, Tally2 } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: any[];
}

export const semesters = [
  {
    value: "1",
    label: "1",
    icon: Tally1,
  },
  {
    value: "2",
    label: "2",
    icon: Tally2,
  },
];

export function DataTableToolbar<TData>({
  table,
  data,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const handleExportPDF = async () => {
    console.log("Exporting to PDF...");
    console.log(JSON.stringify(data));
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Laporan Kinerja Karyawan", 14, 15);

    doc.setFontSize(10);
    doc.text(`Diekspor pada: ${new Date().toLocaleString()}`, 14, 22);

    doc.autoTable({
      startY: 30,
      head: [
        [
          "No.",
          "Nama",
          "Email",
          "Divisi",
          "Jabatan",
          "Tahun",
          "Semester",
          "Level Sum",
        ],
      ],
      body: data.map((item, index) => [
        index + 1,
        item.nama,
        item.email,
        item.divisi,
        item.jabatan,
        item.tahun,
        item.semester,
        item.levelSum,
      ]),
    });

    doc.save(`laporan_penilaian_karyawan.pdf`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search name..."
          value={(table.getColumn("nama")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nama")?.setFilterValue(event.target.value)
          }
          className="w-1/6"
        />
        {table.getColumn("semester") && (
          <DataTableFacetedFilter
            column={table.getColumn("semester")}
            title="Semester"
            options={semesters}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
      <Button onClick={handleExportPDF} size="sm" className="ml-2">
        <FileText className="mr-2 h-4 w-4" />
        Export to PDF
      </Button>
    </div>
  );
}
