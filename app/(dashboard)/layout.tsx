"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { fetchGetme, useDispatch } from "@/lib/redux";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetme());
  }, [dispatch]);

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
