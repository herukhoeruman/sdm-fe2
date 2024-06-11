"use client";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { ProsesPertanyaanForm } from "./_components/proses-pertanyaan-form";
import { getData } from "@/lib/fetcher";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

// const getDataPenilai = async (): Promise<Penilai[]> => {
//   try {
//     const response = await getData(`/api/data/sdmShowProsess`);
//     return response?.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

const PertanyaanPage = () => {
  // const data = await getDataPenilai();

  const [data, setData] = useState([]);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(`/api/data/sdmShowProsess`);
        setData(response?.data || []);
        console.log(response?.data);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    };

    fetchData();
  }, [isSubmitSuccess]);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <p className="text-2xl font-medium">Generate penilai</p>
        <div className="border rounded-md p-3">
          <ProsesPertanyaanForm
            onSubmitSuccess={() => setIsSubmitSuccess(true)}
          />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </ScrollArea>
  );
};

export default PertanyaanPage;
