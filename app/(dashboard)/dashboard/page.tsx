"use client";

import { useRouter } from "next/navigation";

import Loading from "@/app/loading";
import { useSelector } from "@/lib/redux";

const DashboardPage = () => {
  const { data: me, loading } = useSelector((state) => state.getme);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl">{me?.nama} </h1>
      <p className="text-zinc-600">{me?.jabatan}</p>
      <p className="text-sm text-zinc-600">{me?.divisi}</p>
    </div>
  );
};

export default DashboardPage;
