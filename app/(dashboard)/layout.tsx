"use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  clearToken,
  useDispatch,
  useGetMeQuery,
  useSelector,
} from "@/lib/redux";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import toast from "react-hot-toast";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isError } = useGetMeQuery();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      toast.error("Sesi Anda telah berakhir. Silahkan login kembali.");
      dispatch(clearToken());
      redirect("/");
    }
  }, [dispatch, isError, router]);

  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full pt-16 h-full">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
