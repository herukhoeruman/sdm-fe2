"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useGetMeQuery, useGetPegawaiByIdQuery } from "@/lib/redux";
import { PegawaiDetail } from "./pegawai-detail";
import { FormCreatePegawai } from "@/app/(dashboard)/pegawai/_components/form/form-create-pegawai";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CurrentUserProfile({ editing = false }: { editing?: boolean }) {
  const me = useGetMeQuery();
  const pegawai = useGetPegawaiByIdQuery(me.data?.id ?? 0, { skip: !me.data });
  const isLoading =
    me.isLoading || (!me.isError && !me.data) || pegawai.isLoading;
  const isError = me.isError || pegawai.isError;
  const refetch = () => {
    if (me.isError || !me.data) void me.refetch();
    else void pegawai.refetch();
  };

  if (!editing || isLoading || isError || !pegawai.data) {
    return (
      <PegawaiDetail
        profile
        data={pegawai.data}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto w-full space-y-6 p-4 sm:p-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke Profil
        </Link>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Update Akun</h1>
          <p className="text-sm text-muted-foreground">
            Perbarui nama, email, username, dan password Anda. Informasi
            pekerjaan, penilaian, dan validasi tidak dapat diedit di sini.
          </p>
        </div>
        <FormCreatePegawai
          key={pegawai.data.id}
          initialData={pegawai.data}
          accountOnly
        />
      </div>
    </ScrollArea>
  );
}
