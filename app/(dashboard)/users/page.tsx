"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { useGetUsersQuery } from "@/lib/redux";

const UsersPage = () => {
  const { data = [] } = useGetUsersQuery();
  // const { data, error, isLoading } = useData<User[]>(
  //   `${process.env.NEXT_PUBLIC_API}/api/data/user`,
  //   token
  // );

  // if (isLoading) return <Loading />;
  // if (error) return <div>Error: {error.message}</div>;
  // if (!data) return <div>No data</div>;

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <p className="text-2xl font-medium">Data User</p>
        <DataTable columns={columns} data={data} />
      </div>
    </ScrollArea>
  );
};

export default UsersPage;
