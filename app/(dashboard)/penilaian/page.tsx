"use client";

import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMeQuery, useGetPersonsQuery } from "@/lib/redux";
import { PersonsCard } from "./_components/persons-card";
import { SkeletonCard } from "./_components/skeleton-card";

const PenilaianPage = () => {
  const { data: me, isLoading: isMeLoading, isError: isMeError, refetch: refetchMe } = useGetMeQuery();
  const { data: persons = [], isLoading: isPersonsLoading, isError: isPersonsError, refetch: refetchPersons } = useGetPersonsQuery(me?.id as number, {
    skip: !me?.id,
  });
  const loading = isMeLoading || isPersonsLoading;
  const hasError = isMeError || isPersonsError;
  const completed = persons.filter((person) => person.penilaian).length;
  const summary = [
    { label: "Total Pegawai", value: persons.length },
    { label: "Belum Dinilai", value: persons.length - completed },
    { label: "Sudah Dinilai", value: completed },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Penilaian Pegawai</h1>
          <p className="text-sm text-muted-foreground">
            Pilih pegawai yang belum dinilai untuk memulai penilaian individu.
          </p>
        </div>

        {!hasError && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {summary.map((item) => (
              <Card key={item.label}>
                <CardContent className="space-y-2 p-4 sm:p-5">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  {loading ? <Skeleton className="h-8 w-12" /> : <p className="text-2xl font-semibold tabular-nums">{item.value}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {hasError ? (
          <Card>
            <CardContent className="space-y-4 p-6 text-center">
              <p className="text-sm text-muted-foreground">Gagal memuat daftar penilaian pegawai.</p>
              <Button variant="outline" onClick={() => isMeError ? refetchMe() : refetchPersons()}>Coba Lagi</Button>
            </CardContent>
          </Card>
        ) : loading ? (
          <SkeletonCard />
        ) : persons.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-12 text-center">
            <div className="rounded-full bg-muted p-3">
              <Users className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            </div>
            <h2 className="text-base font-semibold">Belum ada pegawai untuk dinilai</h2>
            <p className="max-w-sm text-sm text-muted-foreground">Daftar pegawai yang dapat Anda nilai akan ditampilkan di sini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
            {persons.map((person) => <PersonsCard key={person.id} person={person} />)}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default PenilaianPage;
