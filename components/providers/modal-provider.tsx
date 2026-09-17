"use client";

import { useEffect, useState } from "react";

import { PegawaiModal } from "@/components/modals/pegawai-modal";
import { UserModal } from "../modals/user-modal";
import { KpiModal } from "../modals/kpi-modal";

export const ModalPovider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <UserModal />
      <PegawaiModal />
      <KpiModal />
    </>
  );
};
