"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { useGetPegawaiQuery } from "@/lib/redux";

const MasterPegawaiPage = () => {
  const { data = [] } = useGetPegawaiQuery();

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <p className="text-2xl font-medium">Data Pegawai</p>
        <DataTable columns={columns} data={data} />
      </div>
    </ScrollArea>
  );
};

export default MasterPegawaiPage;
