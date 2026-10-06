"use client";

import { PegawaiDetail } from "@/components/pegawai/pegawai-detail";
import { useGetPegawaiByIdQuery } from "@/lib/redux";

export default function PegawaiIdPage({ params }: { params: { pegawaiId: string } }) {
  const { data, isLoading, isError, refetch } = useGetPegawaiByIdQuery(params.pegawaiId);
  return <PegawaiDetail data={data} isLoading={isLoading} isError={isError} refetch={refetch} />;
}
