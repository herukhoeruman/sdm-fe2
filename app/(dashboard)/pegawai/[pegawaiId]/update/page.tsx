"use client";

import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { FormCreatePegawai } from "../../_components/form/form-create-pegawai";
import { Pegawai } from "../../_components/columns";
import { getData } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const UpdatePage = ({ params }: { params: { pegawaiId: string } }) => {
  const [isLoding, setIsLoding] = useState(false);
  const [data, setData] = useState<Pegawai | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoding(true);
        const response = await getData(`/api/pegawai/${params.pegawaiId}`);

        setData(response?.data);
        console.log(response?.data);
      } catch (error) {
        console.log(error);
        router.push("/pegawai");
      } finally {
        setIsLoding(false);
      }
    };

    fetchData();
  }, [params, router]);
  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {!isLoding && data ? (
          <>
            <p className="text-2xl font-medium">Update Pegawai</p>
            <FormCreatePegawai initialData={data} />
          </>
        ) : (
          <div className="flex items-center justify-center h-[85vh] p-0">
            <Loading />
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default UpdatePage;
