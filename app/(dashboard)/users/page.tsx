"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getData } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { DataTable } from "./_components/data-table";
import { columns, User } from "./_components/columns";

const UsersPage = () => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(`/api/data/user`);

        setData(response?.data || []);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    };

    fetchData();
  }, []);
  // const token = sessionStorage.getItem("token") || "";

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
