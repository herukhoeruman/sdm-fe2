"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Loading from "@/app/loading";
import { useGetPegawaiByIdQuery } from "@/lib/redux";

const UpdatePage = ({ params }: { params: { userId: string } }) => {
  const { data, isLoading } = useGetPegawaiByIdQuery(params.userId);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {!isLoading && data ? (
          <>
            <p className="text-2xl font-medium">Update Role</p>
            {/* <FormCreateUser initialData={data} /> */}
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
