"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserGroupIcon,
  Clock01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMeQuery, useGetPersonsQuery } from "@/lib/redux";
import { PersonsCard } from "./_components/persons-card";
import { SkeletonCard } from "./_components/skeleton-card";

const PenilaianPage = () => {
  const {
    data: me,
    isLoading: isMeLoading,
    isError: isMeError,
    refetch: refetchMe,
  } = useGetMeQuery();
  const {
    data: persons = [],
    isLoading: isPersonsLoading,
    isError: isPersonsError,
    refetch: refetchPersons,
  } = useGetPersonsQuery(me?.id as number, {
    skip: !me?.id,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const loading = isMeLoading || isPersonsLoading;
  const hasError = isMeError || isPersonsError;
  const completed = persons.filter((person) => person.penilaian).length;
  const summary = [
    {
      label: "Total Pegawai",
      value: persons.length,
      icon: UserGroupIcon,
      tone: "border-t-primary",
      iconTone: "bg-accent text-primary",
    },
    {
      label: "Belum Dinilai",
      value: persons.length - completed,
      icon: Clock01Icon,
      tone: "border-t-amber-500",
      iconTone:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    },
    {
      label: "Sudah Dinilai",
      value: completed,
      icon: CheckmarkCircle02Icon,
      tone: "border-t-emerald-500",
      iconTone:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto w-full space-y-6 p-4 sm:p-6">
        <div className="rounded-xl border border-primary/15 bg-gradient-to-r from-accent to-card p-5 shadow-sm sm:p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Evaluasi SDM
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Penilaian Pegawai
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pilih pegawai yang belum dinilai untuk memulai penilaian individu.
          </p>
        </div>

        {!hasError && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {summary.map((item) => (
              <Card key={item.label} className={cn("border-t-4", item.tone)}>
                <CardContent className="space-y-2 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                    <span className={cn("rounded-lg p-2", item.iconTone)}>
                      <HugeiconsIcon
                        icon={item.icon}
                        size={20}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  {loading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-semibold tabular-nums">
                      {item.value}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {hasError ? (
          <Card>
            <CardContent className="space-y-4 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Gagal memuat daftar penilaian pegawai.
              </p>
              <Button
                variant="outline"
                onClick={() => (isMeError ? refetchMe() : refetchPersons())}
              >
                Coba Lagi
              </Button>
            </CardContent>
          </Card>
        ) : loading ? (
          <SkeletonCard />
        ) : persons.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-12 text-center">
            <div className="rounded-full bg-muted p-3">
              <HugeiconsIcon
                icon={UserGroupIcon}
                size={24}
                strokeWidth={1.5}
                className="text-primary"
                aria-hidden="true"
              />
            </div>
            <h2 className="text-base font-semibold">
              Belum ada pegawai untuk dinilai
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Daftar pegawai yang dapat Anda nilai akan ditampilkan di sini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
            {persons.map((person) => (
              <PersonsCard key={person.id} person={person} />
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default PenilaianPage;
