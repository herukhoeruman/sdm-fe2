import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard = () => (
  <div role="status" aria-label="Memuat daftar penilaian" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="min-w-0 space-y-5 rounded-xl border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex items-start gap-3">
          <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 border-t pt-4">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    ))}
  </div>
);
