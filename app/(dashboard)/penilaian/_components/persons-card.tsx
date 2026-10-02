import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PersonResponse } from "@/lib/redux";

interface PersonsCardProps {
  person: PersonResponse;
}

export const PersonsCard = ({ person }: PersonsCardProps) => {
  const content = (
    <>
      <div className="flex items-start gap-3">
        <Image
          alt=""
          src="/avatar.jpeg"
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1 space-y-1">
          <h2 className="break-words text-base font-semibold leading-snug">{person.nama || "—"}</h2>
          <p className="break-words text-sm text-muted-foreground">{person.jabatan || "Jabatan belum tersedia"}</p>
          <p className="break-words text-xs text-muted-foreground">{person.divisi || "Divisi belum tersedia"}</p>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <Badge variant="secondary" className={cn(
          "gap-1.5",
          person.penilaian
            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
            : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
        )}>
          {person.penilaian ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />}
          {person.penilaian ? "Sudah dinilai" : "Belum dinilai"}
        </Badge>
        {!person.penilaian && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
            Mulai Penilaian <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );

  const className = "flex h-full min-w-0 flex-col gap-5 rounded-xl border bg-card p-4 text-card-foreground shadow-sm sm:p-5";

  return person.penilaian ? (
    <div className={className}>{content}</div>
  ) : (
    <Link
      href={`/penilaian/submit/${person.id}`}
      aria-label={`Mulai penilaian ${person.nama}`}
      className={cn(className, "transition-colors hover:border-primary/40 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2")}
    >
      {content}
    </Link>
  );
};
