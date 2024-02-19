import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const SkeletonCard = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {"abcdefg".split("").map((i) => (
          <div
            key={i}
            className="rounded-xl h-[120px] border bg-card  dark:hover:bg-zinc-800 text-card-foreground shadow flex items-center gap-x-2 p-4"
          >
            <div className="inline-flex gap-[27px] justify-center items-center">
              <Skeleton className="rounded-full w-24 h-24" />
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-6 w-52" />
                <Skeleton className="h-4  w-32" />
                <div className="inline-flex items-center text-xs mt-3 ">
                  <Skeleton className="w-4 h-4 rounded-full mr-2" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
