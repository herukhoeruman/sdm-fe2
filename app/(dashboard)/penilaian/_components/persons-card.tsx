import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PersonsCardProps {
  person: {
    id: string;
    nama: string;
    jabatan: string;
    username: string;
    email: string;
    divisi: string;
    nama_atasan: string;
    penilaian: boolean;
    roles: {
      id: string;
      name: string;
    }[];
  };
}

export const PersonsCard = ({ person }: PersonsCardProps) => {
  return (
    <Link href={!person.penilaian ? `/penilaian/submit/${person.id}` : "#"}>
      <div
        className={cn(
          "rounded-xl h-[120px] border bg-card hover:bg-zinc-100 dark:hover:bg-zinc-800 text-card-foreground shadow flex items-center gap-x-2 p-4",
          person.penilaian && "bg-zinc-100"
        )}
      >
        <div className="inline-flex gap-[27px] justify-center items-center">
          <Image
            alt={person.nama}
            src="/avatar.jpeg"
            width={90}
            height={90}
            className="rounded-full duration-700 ease-in-out scale-100 blur-0 grayscale-0 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-bold">{person.nama}</p>
            <p className="text-xs font-medium">{person.jabatan}</p>
            <div className="inline-flex items-center text-xs mt-3 ">
              {person.penilaian && (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />{" "}
                  Sudah dinilai
                </>
              )}
              {!person.penilaian && (
                <>
                  <AlertCircle className="w-4 h-4 text-orange-400 mr-2" /> Belum
                  dinilai
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
