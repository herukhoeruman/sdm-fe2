"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { clearToken, useDispatch, useGetMeQuery } from "@/lib/redux";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isError } = useGetMeQuery();

  useEffect(() => {
    if (isError) {
      dispatch(clearToken());
      router.replace("/?error=tokenExpired");
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
