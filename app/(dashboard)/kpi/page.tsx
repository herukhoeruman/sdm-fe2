// "use client";

// import { Loader2, Plus } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useKpiModal } from "@/hooks/use-kpi-modal";
// import {
//   useGetKpiDefinitionsQuery,
//   useGetPegawaiQuery,
//   useSelector,
// } from "@/lib/redux";
// import { columns } from "./_components/columns";
// import { DataTable } from "./_components/data-table";

// const KpiPage = () => {
//   const { onOpen } = useKpiModal();
//   const user = useSelector((state) => state.auth.user);
//   const currentYear = new Date().getFullYear();

//   const {
//     data: pegawai = [],
//     isLoading: isLoadingPegawai,
//     isError: isPegawaiError,
//     refetch: refetchPegawai,
//   } = useGetPegawaiQuery(undefined, { skip: !user });

//   const currentPegawai = pegawai.find(
//     (item) =>
//       item.id === user?.id ||
//       item.email === user?.email ||
//       item.username === user?.username,
//   );
//   const ownerId = user?.id ?? 0;
//   const parentOwnerId = currentPegawai?.parent ?? 0;
//   const parentPegawai = pegawai.find((item) => item.id === parentOwnerId);

//   const {
//     data: ownKpiDefinitions = [],
//     isLoading: isLoadingOwnKpi,
//     isError: isOwnKpiError,
//     refetch: refetchOwnKpi,
//   } = useGetKpiDefinitionsQuery(
//     {
//       ownerId,
//       tahun: currentYear,
//     },
//     { skip: !ownerId },
//   );

//   const {
//     data: parentKpiDefinitions = [],
//     isLoading: isLoadingParentKpi,
//     isError: isParentKpiError,
//     refetch: refetchParentKpi,
//   } = useGetKpiDefinitionsQuery(
//     {
//       ownerId: parentOwnerId,
//       tahun: currentYear,
//     },
//     { skip: !parentOwnerId },
//   );

//   return (
//     <ScrollArea className="h-full">
//       <div className="space-y-6 p-6">
//         <div className="flex items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-medium">KPI</h1>
//             <p className="text-sm text-muted-foreground">
//               Kelola definisi Key Performance Indicator {user?.nama ?? ""} untuk
//               tahun {currentYear}.
//             </p>
//           </div>
//           <Button onClick={() => onOpen("pegawai")}>
//             <Plus className="mr-2 h-4 w-4" />
//             Create KPI
//           </Button>
//         </div>

//         {isLoadingPegawai || !user ? (
//           <div className="flex h-40 items-center justify-center rounded-md border">
//             <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
//           </div>
//         ) : isPegawaiError || !currentPegawai ? (
//           <div className="rounded-md border border-destructive/50 p-8 text-center">
//             <p className="mb-4 text-sm text-destructive">
//               Data pegawai untuk user aktif tidak ditemukan.
//             </p>
//             <Button variant="outline" onClick={() => refetchPegawai()}>
//               Coba lagi
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-10">
//             <section className="space-y-4">
//               <div>
//                 <h2 className="text-lg font-medium">KPI Saya</h2> test
//                 <p className="text-sm text-muted-foreground">
//                   KPI milik {currentPegawai.nama} untuk tahun {currentYear}.
//                 </p>
//               </div>

//               {isLoadingOwnKpi ? (
//                 <div className="flex h-32 items-center justify-center rounded-md border">
//                   <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
//                 </div>
//               ) : isOwnKpiError ? (
//                 <div className="rounded-md border border-destructive/50 p-6 text-center">
//                   <p className="mb-3 text-sm text-destructive">
//                     KPI sendiri gagal dimuat.
//                   </p>
//                   <Button variant="outline" onClick={() => refetchOwnKpi()}>
//                     Coba lagi
//                   </Button>
//                 </div>
//               ) : (
//                 <DataTable columns={columns} data={ownKpiDefinitions} />
//               )}
//             </section>

//             <section className="space-y-4">
//               <div>
//                 <h2 className="text-lg font-medium">KPI Atasan</h2>
//                 <p className="text-sm text-muted-foreground">
//                   {parentOwnerId
//                     ? `KPI milik ${
//                         parentPegawai?.nama ||
//                         currentPegawai.namaAtasan ||
//                         `atasan ID ${parentOwnerId}`
//                       } untuk tahun ${currentYear}.`
//                     : "Anda tidak memiliki parent/atasan."}
//                 </p>
//               </div>

//               {!parentOwnerId ? (
//                 <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
//                   Data KPI atasan tidak tersedia.
//                 </div>
//               ) : isLoadingParentKpi ? (
//                 <div className="flex h-32 items-center justify-center rounded-md border">
//                   <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
//                 </div>
//               ) : isParentKpiError ? (
//                 <div className="rounded-md border border-destructive/50 p-6 text-center">
//                   <p className="mb-3 text-sm text-destructive">
//                     KPI atasan gagal dimuat.
//                   </p>
//                   <Button variant="outline" onClick={() => refetchParentKpi()}>
//                     Coba lagi
//                   </Button>
//                 </div>
//               ) : (
//                 <DataTable columns={columns} data={parentKpiDefinitions} />
//               )}
//             </section>
//           </div>
//         )}
//       </div>
//     </ScrollArea>
//   );
// };

// export default KpiPage;

"use client";

import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useKpiModal } from "@/hooks/use-kpi-modal";
import { useGetKpiDefinitionsQuery, useGetMeQuery } from "@/lib/redux";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const KpiPage = () => {
  const { onOpen } = useKpiModal();
  const currentYear = new Date().getFullYear();

  const {
    data: me,
    isLoading: isLoadingMe,
    isError: isMeError,
    refetch: refetchMe,
  } = useGetMeQuery();

  const ownerId = me?.id ?? 0;
  const parentOwnerId = me?.parent ?? 0;

  const {
    data: ownKpiDefinitions = [],
    isLoading: isLoadingOwnKpi,
    isError: isOwnKpiError,
    refetch: refetchOwnKpi,
  } = useGetKpiDefinitionsQuery(
    {
      ownerId,
      tahun: currentYear,
    },
    { skip: !ownerId },
  );

  const {
    data: parentKpiDefinitions = [],
    isLoading: isLoadingParentKpi,
    isError: isParentKpiError,
    refetch: refetchParentKpi,
  } = useGetKpiDefinitionsQuery(
    {
      ownerId: parentOwnerId,
      tahun: currentYear,
    },
    { skip: !parentOwnerId },
  );

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-medium">KPI</h1>
            <p className="text-sm text-muted-foreground">
              Kelola definisi Key Performance Indicator {me?.nama ?? ""} untuk
              tahun {currentYear}.
            </p>
          </div>
          <Button onClick={() => onOpen("pegawai")}>
            <Plus className="mr-2 h-4 w-4" />
            Create KPI
          </Button>
        </div>

        <Tabs defaultValue="kpi-atasan" className="w-full">
          <TabsList>
            <TabsTrigger value="kpi-atasan">KPI Atasan</TabsTrigger>
            <TabsTrigger value="kpi-saya">KPI Saya</TabsTrigger>
          </TabsList>

          {isLoadingMe ? (
            <div className="flex h-40 items-center justify-center rounded-md border">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : isMeError || !me ? (
            <div className="rounded-md border border-destructive/50 p-8 text-center">
              <p className="mb-4 text-sm text-destructive">
                Data pegawai untuk user aktif tidak ditemukan.
              </p>
              <Button variant="outline" onClick={() => refetchMe()}>
                Coba lagi
              </Button>
            </div>
          ) : (
            <div className="space-y-10">
              <TabsContent value="kpi-atasan">
                <section className="space-y-4">
                  <div>
                    <h2 className="text-lg font-medium">KPI Atasan</h2>
                    <p className="text-sm text-muted-foreground">
                      {parentOwnerId
                        ? `KPI milik Atasan untuk tahun ${currentYear}.`
                        : "Anda tidak memiliki parent/atasan."}
                    </p>
                  </div>

                  {!parentOwnerId ? (
                    <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
                      Data KPI atasan tidak tersedia.
                    </div>
                  ) : isLoadingParentKpi ? (
                    <div className="flex h-32 items-center justify-center rounded-md border">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : isParentKpiError ? (
                    <div className="rounded-md border border-destructive/50 p-6 text-center">
                      <p className="mb-3 text-sm text-destructive">
                        KPI atasan gagal dimuat.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => refetchParentKpi()}
                      >
                        Coba lagi
                      </Button>
                    </div>
                  ) : (
                    <DataTable columns={columns} data={parentKpiDefinitions} />
                  )}
                </section>
              </TabsContent>

              <TabsContent value="kpi-saya">
                <section className="space-y-4">
                  <div>
                    <h2 className="text-lg font-medium">KPI Saya</h2>
                    <p className="text-sm text-muted-foreground">
                      KPI milik {me.nama} untuk tahun {currentYear}.
                    </p>
                  </div>

                  {isLoadingOwnKpi ? (
                    <div className="flex h-32 items-center justify-center rounded-md border">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : isOwnKpiError ? (
                    <div className="rounded-md border border-destructive/50 p-6 text-center">
                      <p className="mb-3 text-sm text-destructive">
                        KPI sendiri gagal dimuat.
                      </p>
                      <Button variant="outline" onClick={() => refetchOwnKpi()}>
                        Coba lagi
                      </Button>
                    </div>
                  ) : (
                    <DataTable columns={columns} data={ownKpiDefinitions} />
                  )}
                </section>
              </TabsContent>
            </div>
          )}
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default KpiPage;
