"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetMeQuery, useGetPersonsQuery } from "@/lib/redux";
import { PersonsCard } from "./_components/persons-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkeletonCard } from "./_components/skeleton-card";

const PenilaianPage = () => {
  const { data: me } = useGetMeQuery();
  const { data: persons = [], isLoading } = useGetPersonsQuery(me?.id as number, {
    skip: !me?.id,
  });

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (persons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Data Karyawan Kosong</h1>
        <p className="text-gray-500">
          Tidak ada data karyawan yang bisa ditampilkan
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {persons.map((person) => (
            <PersonsCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default PenilaianPage;
