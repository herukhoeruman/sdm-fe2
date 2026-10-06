"use client";

import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";

import Loading from "@/app/loading";
import type { PegawaiResponse } from "@/lib/redux";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PegawaiDetailProps {
  data?: PegawaiResponse;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  profile?: boolean;
}

export const PegawaiDetail = ({ data, isLoading, isError, refetch, profile = false }: PegawaiDetailProps) => {
  if (isLoading) return <Loading />;

  const sections = data
    ? [
        {
          title: "Informasi Akun",
          fields: [
            { label: "Nama", value: data.nama },
            { label: "Email", value: data.email },
            { label: "Username", value: data.username },
            { label: "Password", value: "••••••••" },
          ],
        },
        {
          title: "Informasi Pekerjaan",
          fields: [
            { label: "Divisi", value: data.divisi },
            { label: "Jabatan", value: data.jabatan },
            { label: "ID Atasan (Parent)", value: data.parent },
            { label: "Nama Atasan", value: data.namaAtasan },
          ],
        },
      ]
    : [];

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto w-full space-y-6 p-4 sm:p-6">
        <Link
          href={profile ? "/dashboard" : "/pegawai"}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {profile ? "Kembali ke Dashboard" : "Kembali ke Pegawai"}
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {profile ? "Profil Saya" : "Detail Pegawai"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Informasi akun, pekerjaan, dan penilaian pegawai.
            </p>
          </div>
          {data && !isError && (
            <Button asChild className="w-full sm:w-auto">
              <Link href={profile ? "/profile/update" : `/pegawai/${data.id}/update`}>
                <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
                {profile ? "Update Akun" : "Edit Pegawai"}
              </Link>
            </Button>
          )}
        </div>

        {isError || !data ? (
          <Card>
            <CardContent className="space-y-4 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isError
                  ? profile ? "Gagal memuat profil." : "Gagal memuat detail pegawai."
                  : "Data pegawai tidak ditemukan."}
              </p>
              {isError && (
                <Button variant="outline" onClick={() => refetch()}>
                  Coba Lagi
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="border-primary/20 bg-gradient-to-br from-card to-accent/70">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-6">
                <div
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary"
                >
                  {data.nama
                    ?.trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((name) => name[0])
                    .join("")
                    .toUpperCase() || "P"}
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <h2 className="break-words text-xl font-semibold">
                    {data.nama || "—"}
                  </h2>
                  <p className="break-words text-sm text-muted-foreground">
                    {[data.jabatan, data.divisi].filter(Boolean).join(" · ") ||
                      "Informasi pekerjaan belum tersedia"}
                  </p>
                </div>
                <Badge variant="secondary" className="w-fit shrink-0">
                  ID Pegawai: {data.id}
                </Badge>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
              {sections.map((section) => (
                <Card key={section.title} className="min-w-0">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                    <dl className="divide-y">
                      {section.fields.map((field) => (
                        <div
                          key={field.label}
                          className="space-y-1 py-3 first:pt-0 last:pb-0"
                        >
                          <dt className="text-xs font-medium text-muted-foreground">
                            {field.label}
                          </dt>
                          <dd className="break-words text-sm font-medium">
                            {field.value === "" || field.value == null
                              ? "—"
                              : field.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base">
                  Penilaian dan Validasi
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <dl className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <dt className="text-xs font-medium text-muted-foreground">
                      Penilaian
                    </dt>
                    <dd className="text-sm font-medium">
                      {data.penilaian ?? "—"}
                    </dd>
                  </div>
                  <div className="space-y-2">
                    <dt className="text-xs font-medium text-muted-foreground">
                      Validasi SDM
                    </dt>
                    <dd>
                      <Badge
                        variant={
                          data.validasiSdm === 1 ? "default" : "secondary"
                        }
                      >
                        {data.validasiSdm == null
                          ? "Belum tersedia"
                          : data.validasiSdm === 1
                            ? "Tervalidasi"
                            : "Belum tervalidasi"}
                      </Badge>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </ScrollArea>
  );
};

