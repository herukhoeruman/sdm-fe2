"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./data-table-view-options";
import { Plus } from "lucide-react";
import Link from "next/link";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  data: any[];
}

export function DataTableToolbar<TData>({
  table,
  data,
}: DataTableToolbarProps<TData>) {
  // const pegawaiModal = usePegawaiModal(); // if you want to use modal

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-1">
        <Input
          aria-label="Cari nama"
          placeholder="Cari nama..."
          value={(table.getColumn("nama")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nama")?.setFilterValue(event.target.value)
          }
          className="w-full sm:w-64"
        />
        {/* {table.getColumn("semester") && (
          <DataTableFacetedFilter
            column={table.getColumn("semester")}
            title="Semester"
            options={semesters}
          />
        )} */}
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
      <Button
        className="w-full sm:w-auto"
        size="sm"
        asChild
        // onClick={() => {
        //   pegawaiModal.onOpen();
        // }}
      >
        <Link href="/pegawai/create">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Pegawai
        </Link>
      </Button>
    </div>
  );
}
