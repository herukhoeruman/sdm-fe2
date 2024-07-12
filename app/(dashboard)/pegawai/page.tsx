"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getData } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { DataTable } from "./_components/data-table";
import { columns, Pegawai } from "./_components/columns";

const MasterPegawaiPage = () => {
  const [data, setData] = useState<Pegawai[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(`/api/pegawai`);

        setData(response?.data || []);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    };

    fetchData();
  }, []);

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
