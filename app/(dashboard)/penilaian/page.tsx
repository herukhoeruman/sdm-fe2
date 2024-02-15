"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getData } from "@/lib/fetcher";
import { useSelector } from "@/lib/redux";
import Loading from "@/app/loading";
import { PersonsCard } from "./_components/persons-card";
import { ScrollArea } from "@/components/ui/scroll-area";

const PenilaianPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [persons, setPersons] = useState([]);

  const { data } = useSelector((state) => state.getme);

  useEffect(() => {
    const getPersons = async () => {
      try {
        setIsLoading(true);
        const response = await getData(`/api/data/person/${data?.id}`);
        setPersons(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPersons();
  }, [data]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (isLoading) return <Loading />;

  // return <div>{JSON.stringify(persons)}</div>;

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {persons.map((person: any) => (
            <PersonsCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default PenilaianPage;
