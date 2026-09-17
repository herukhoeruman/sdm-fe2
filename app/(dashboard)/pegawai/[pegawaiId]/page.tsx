"use client";

import Loading from "@/app/loading";
import { useGetPegawaiByIdQuery } from "@/lib/redux";

const PegawaiIdPage = ({ params }: { params: { pegawaiId: string } }) => {
  const { data, isLoading } = useGetPegawaiByIdQuery(params.pegawaiId);

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <div className="p-6 space-y-6">
      <p className="text-2xl font-medium">Detail Pegawai</p>

      <div className="flex flex-col space-y-2">
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <p className="font-medium">Nama</p>
          <p>: {data?.nama}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <p className="font-medium">Email</p>
          <p>: {data?.email}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <p className="font-medium">Divisi</p>
          <p>: {data?.divisi}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <p className="font-medium">Jabatan</p>
          <p>: {data?.jabatan}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <p className="font-medium">Username</p>
          <p>: {data?.username}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <p className="font-medium">Password</p>
          <p>: ******* </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <p className="font-medium">Parent</p>
          <p>: {data?.parent}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <p className="font-medium">Nama atasan</p>
          <p>: {data?.namaAtasan}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <p className="font-medium">Penilaian</p>
          <p>: {data?.penilaian}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <p className="font-medium">Validasi SDM</p>
          <p>: {data?.validasiSdm}</p>
        </div>
      </div>
    </div>
  );
};

export default PegawaiIdPage;
