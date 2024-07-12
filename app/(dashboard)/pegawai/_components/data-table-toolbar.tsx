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
        className="ml-2"
        size="sm"
        asChild
        // onClick={() => {
        //   pegawaiModal.onOpen();
        // }}
      >
        <Link href="/pegawai/create">
          <Plus className="mr-2 h-4 w-4" />
          Add Pegawai
        </Link>
      </Button>
    </div>
  );
}
