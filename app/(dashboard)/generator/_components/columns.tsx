"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Penilai = {
  email: string;
  tahun: string;
  semester: string;
  tanggal: string;
};

export const columns: ColumnDef<Penilai>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal",
  },
  {
    accessorKey: "tahun",
    header: "Tahun",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
];
