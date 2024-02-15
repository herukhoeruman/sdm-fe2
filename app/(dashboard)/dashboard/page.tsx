"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Loading from "@/app/loading";
import { useSelector } from "@/lib/redux";

const DashboardPage = () => {
  const router = useRouter();

  const { data: me, error, loading } = useSelector((state) => state.getme);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl">{me?.nama} </h1>
      <p className="text-sm text-zinc-600">{me?.jabatan}</p>
      <p className="text-sm text-zinc-600">{me?.email}</p>
    </div>
  );
};

export default DashboardPage;
