"use client";

import Loading from "@/app/loading";
import { useGetMeQuery } from "@/lib/redux";

const DashboardPage = () => {
  const { data: me, isLoading } = useGetMeQuery();

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl">{me?.nama} </h1>
      <p className="text-sm text-zinc-600">{me?.jabatan}</p>
      <p className="text-sm text-zinc-600">{me?.divisi}</p>
    </div>
  );
};

export default DashboardPage;
