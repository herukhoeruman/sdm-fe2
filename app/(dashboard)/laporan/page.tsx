"use client";

import { useEffect, useState } from "react";

import { getData } from "@/lib/fetcher";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export interface EmployeeSum {
  email: string;
  divisi: string;
  jabatan: string;
  tahun: string;
  semester: string;
  levelSum: number;
}

const LaporanPage = () => {
  const [data, setData] = useState<EmployeeSum[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(`/api/data/employeesum`);

        // console.log(response.data);
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
        <p className="text-2xl font-medium">Laporan</p>
        <DataTable columns={columns} data={data} />
      </div>
    </ScrollArea>
  );
};

export default LaporanPage;
