import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const SkeletonPenilaian = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href="/penilaian"
            className="flex items-center hover:opacity-75 transition mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Penilaian Individu</h1>
          <span className="text-sm text-slate-700 dark:text-slate-100">
            Berikan jawaban yang menurut anda paling tepat
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-16 gap-6">
        <div className="grid grid-cols text-sm space-y-3">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-40 h-4" />
        </div>
        {"abc".split("").map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="flex items-center justify-center">
                  <Skeleton className="w-12 h-12 rounded-full" />
                </div>
                <div className="w-full space-y-2">
                  <Skeleton className=" w-11/12 h-6" />
                  <Skeleton className=" w-2/3 h-6" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex items-center text-foreground/60 mt-6">
                  <div className="border-b w-[50px] dark:border-white/2"></div>
                  <Skeleton className="w-24 h-4 mx-2" />
                  <div className="border-b w-auto grow dark:border-white/2" />
                </div>
                {"abcd".split("").map((i) => (
                  <div
                    key={i}
                    className="flex flex-row gap-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-3"
                  >
                    <div>
                      <Skeleton className="w-10 h-10" />
                    </div>
                    <div className="space-y-2 w-full">
                      <Skeleton className="w-11/12 h-4" />
                      <Skeleton className=" w-1/2 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="flex flex-col md:flex-row items-center justify-end">
          <Skeleton className="w-24 h-8 md:mr-4" />
          <Skeleton className="w-24 h-8" />
        </div>
      </div>
    </div>
  );
};
