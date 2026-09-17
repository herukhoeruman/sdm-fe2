"use client";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { ProsesPertanyaanForm } from "./_components/proses-pertanyaan-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetSdmProcessesQuery } from "@/lib/redux";

const PertanyaanPage = () => {
  const { data = [] } = useGetSdmProcessesQuery();

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <p className="text-2xl font-medium">Generate penilai</p>
        <div className="border rounded-md p-3">
          <ProsesPertanyaanForm onSubmitSuccess={() => undefined} />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </ScrollArea>
  );
};

export default PertanyaanPage;
