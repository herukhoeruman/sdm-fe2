// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { useForm, useWatch } from "react-hook-form";
// import toast from "react-hot-toast";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import { Combobox } from "@/components/ui/combobox";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useKpiModal } from "@/hooks/use-kpi-modal";
// import {
//   useCreateKpiDefinitionMutation,
//   useGetKpiDefinitionsQuery,
//   useGetPegawaiQuery,
//   useSelector,
// } from "@/lib/redux";

// const formSchema = z.object({
//   name: z.string().trim().min(1, "Nama KPI wajib diisi"),
//   description: z.string().trim().min(1, "Deskripsi wajib diisi"),
//   unit: z.string().trim().min(1, "Nama departemen wajib diisi"),
//   parentKpiId: z.number().int().positive().nullable(),
//   ownerId: z.number().int().positive("Owner wajib dipilih"),
//   weight: z.coerce
//     .number()
//     .min(0, "Bobot minimal 0")
//     .max(100, "Bobot maksimal 100"),
//   cascadeRatio: z.coerce
//     .number()
//     .min(0, "Rasio minimal 0")
//     .max(100, "Rasio maksimal 100"),
//   tahun: z.coerce.number().int().min(2000, "Tahun tidak valid"),
//   level: z.enum(["STAFF", "VP", "MANAGER", "BOD", "COMPANY"]),
//   kpiCode: z.string().trim().min(1, "Kode KPI wajib diisi"),
// });

// type KpiFormValues = z.infer<typeof formSchema>;

// const getDefaultValues = (ownerId = 0): KpiFormValues => ({
//   name: "",
//   description: "",
//   unit: "",
//   parentKpiId: null,
//   ownerId,
//   weight: 40,
//   cascadeRatio: 100,
//   tahun: new Date().getFullYear(),
//   level: "COMPANY",
//   kpiCode: "",
// });

// export const KpiModal = () => {
//   const { isOpen, mode, onClose } = useKpiModal();
//   const user = useSelector((state) => state.auth.user);
//   const isPegawaiMode = mode === "pegawai";

//   const { data: pegawai = [], isLoading: isLoadingPegawai } =
//     useGetPegawaiQuery(undefined, { skip: !isOpen });
//   const [createKpiDefinition, { isLoading }] = useCreateKpiDefinitionMutation();

//   const form = useForm<KpiFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: getDefaultValues(),
//   });

//   const ownerId = useWatch({ control: form.control, name: "ownerId" });
//   const tahun = useWatch({ control: form.control, name: "tahun" });

//   const ownerOptions = pegawai.map((item) => ({
//     value: item.id.toString(),
//     label: `${item.nama}`,
//   }));

//   if (
//     isPegawaiMode &&
//     user &&
//     !ownerOptions.some((item) => item.value === user.id.toString())
//   ) {
//     ownerOptions.unshift({ value: user.id.toString(), label: user.nama });
//   }

//   const selectedOwner = pegawai.find((item) => item.id === ownerId);
//   const parentOwnerId = selectedOwner?.parent ?? 0;
//   const parentOwner = pegawai.find((item) => item.id === parentOwnerId);

//   const { data: parentKpi, isFetching: parentKpiLoading } =
//     useGetKpiDefinitionsQuery(
//       {
//         ownerId: parentOwnerId,
//         tahun: tahun || new Date().getFullYear(),
//       },
//       { skip: !isOpen || !parentOwnerId || !tahun },
//     );

//   const parentKpiOptions = [
//     { value: "none", label: "Tanpa Parent KPI" },

//     ...(parentKpi?.map((item) => ({
//       value: item.id?.toString() ?? "",
//       label: `${item.kpiCode} - ${item.name}`,
//     })) ?? []),
//   ];

//   useEffect(() => {
//     if (isOpen) {
//       form.reset(getDefaultValues(isPegawaiMode ? (user?.id ?? 0) : 0));
//     }
//   }, [form, isOpen, isPegawaiMode, user?.id]);

//   useEffect(() => {
//     form.setValue("parentKpiId", null);
//   }, [form, ownerId, tahun]);

//   const handleClose = () => {
//     if (!isLoading) onClose();
//   };

//   const onSubmit = async (values: KpiFormValues) => {
//     try {
//       const payload =
//         isPegawaiMode && user
//           ? {
//               ...values,
//               ownerId: user.id,
//             }
//           : values;

//       await createKpiDefinition(payload).unwrap();
//       toast.success("KPI berhasil dibuat");
//       onClose();
//     } catch (error) {
//       const apiError = error as { data?: { message?: string } };
//       toast.error(apiError.data?.message ?? "KPI gagal dibuat");
//     }
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={(open) => {
//         if (!open) handleClose();
//       }}
//     >
//       <DialogContent
//         className="sm:max-w-2xl"
//         onPointerDownOutside={(e) => e.preventDefault()}
//         onEscapeKeyDown={(e) => e.preventDefault()}
//       >
//         <DialogHeader>
//           <DialogTitle>
//             Create KPI {isPegawaiMode ? "Pegawai" : "SDM"}
//           </DialogTitle>
//           <DialogDescription>
//             {isPegawaiMode
//               ? "Owner otomatis menggunakan user yang sedang login."
//               : "Lengkapi informasi definisi KPI dan pilih owner."}
//           </DialogDescription>
//         </DialogHeader>

//         {/* <p>{JSON.stringify(parentKpi, null, 2)}</p> */}
//         <Form {...form}>
//           <form
//             className="grid gap-4 sm:grid-cols-2"
//             onSubmit={form.handleSubmit(onSubmit)}
//           >
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem className="sm:col-span-2">
//                   <FormLabel>Nama KPI</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Revenue Growth" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="tahun"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Tahun</FormLabel>
//                   <FormControl>
//                     <Input type="number" min={2000} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="unit"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Unit / Nama Departemen</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Contoh: Finance" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="level"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Level</FormLabel>
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Pilih level" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="STAFF">Staff</SelectItem>
//                       <SelectItem value="VP">VP</SelectItem>
//                       <SelectItem value="MANAGER">Manager</SelectItem>
//                       <SelectItem value="BOD">BOD</SelectItem>
//                       <SelectItem value="COMPANY">Company</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="ownerId"
//               render={({ field }) => (
//                 <FormItem className=" ">
//                   <FormLabel>Owner</FormLabel>
//                   <FormControl>
//                     <Combobox
//                       disabled={isPegawaiMode || isLoadingPegawai}
//                       options={ownerOptions}
//                       value={field.value.toString()}
//                       onChange={(value) => field.onChange(Number(value))}
//                     />
//                   </FormControl>
//                   {isLoadingPegawai && (
//                     <p className="text-xs text-muted-foreground">
//                       Memuat data pegawai...
//                     </p>
//                   )}
//                   {isPegawaiMode && (
//                     <p className="text-xs text-muted-foreground">
//                       Owner: {user?.nama ?? "User aktif"}
//                     </p>
//                   )}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="parentKpiId"
//               render={({ field }) => (
//                 <FormItem className=" ">
//                   <FormLabel>Parent KPI (opsional)</FormLabel>
//                   <FormControl>
//                     <Combobox
//                       disabled={parentKpiLoading || !ownerId || !parentOwnerId}
//                       options={parentKpiOptions}
//                       value={field.value?.toString() ?? "none"}
//                       onChange={(value) =>
//                         field.onChange(
//                           value === "none" || value === ""
//                             ? null
//                             : Number(value),
//                         )
//                       }
//                     />
//                   </FormControl>
//                   {parentKpiLoading && (
//                     <p className="text-xs text-muted-foreground">
//                       Memuat data KPI parent...
//                     </p>
//                   )}
//                   {!parentKpiLoading && ownerId > 0 && (
//                     <p className="text-xs text-muted-foreground">
//                       {parentOwnerId
//                         ? `KPI milik atasan: ${
//                             parentOwner?.nama ||
//                             selectedOwner?.namaAtasan ||
//                             `ID ${parentOwnerId}`
//                           }`
//                         : "Owner tidak memiliki parent/atasan."}
//                     </p>
//                   )}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="kpiCode"
//               render={({ field }) => (
//                 <FormItem className="">
//                   <FormLabel>Kode KPI</FormLabel>
//                   <FormControl>
//                     <Input placeholder="1.1" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="weight"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Bobot (%)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min={0}
//                       max={100}
//                       step="0.01"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="cascadeRatio"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Cascade Ratio (%)</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       min={0}
//                       max={100}
//                       step="0.01"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem className="sm:col-span-2">
//                   <FormLabel>Deskripsi</FormLabel>
//                   <FormControl>
//                     <textarea
//                       className="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
//                       placeholder="Meningkatkan pertumbuhan revenue perusahaan"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <DialogFooter className="mt-2 sm:col-span-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 disabled={isLoading}
//                 onClick={handleClose}
//               >
//                 Batal
//               </Button>
//               <Button type="submit" disabled={isLoading}>
//                 {isLoading ? "Menyimpan..." : "Simpan KPI"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useKpiModal } from "@/hooks/use-kpi-modal";
import {
  useCreateKpiDefinitionMutation,
  useGetKpiDefinitionsQuery,
  useGetMeQuery,
  useGetPegawaiQuery,
} from "@/lib/redux";

const formSchema = z.object({
  name: z.string().trim().min(1, "Nama KPI wajib diisi"),
  description: z.string().trim().min(1, "Deskripsi wajib diisi"),
  unit: z.string().trim().min(1, "Nama departemen wajib diisi"),
  parentKpiId: z.number().int().positive().nullable(),
  ownerId: z.number().int().positive("Owner wajib dipilih"),
  weight: z.coerce
    .number()
    .min(0, "Bobot minimal 0")
    .max(100, "Bobot maksimal 100"),
  cascadeRatio: z.coerce
    .number()
    .min(0, "Rasio minimal 0")
    .max(100, "Rasio maksimal 100"),
  tahun: z.coerce.number().int().min(2000, "Tahun tidak valid"),
  level: z.enum(["STAFF", "VP", "MANAGER", "BOD", "COMPANY"]),
  kpiCode: z.string().trim().min(1, "Kode KPI wajib diisi"),
});

type KpiFormValues = z.infer<typeof formSchema>;

const getDefaultValues = (ownerId = 0): KpiFormValues => ({
  name: "",
  description: "",
  unit: "",
  parentKpiId: null,
  ownerId,
  weight: 40,
  cascadeRatio: 100,
  tahun: new Date().getFullYear(),
  level: "COMPANY",
  kpiCode: "",
});

export const KpiModal = () => {
  const { isOpen, mode, onClose } = useKpiModal();
  const isPegawaiMode = mode === "pegawai";

  // Sumber identitas user yang login — bisa diakses semua role
  const { data: me } = useGetMeQuery();

  // List pegawai hanya untuk mode SDM (role USER tidak boleh akses endpoint ini)
  const { data: pegawai = [], isLoading: isLoadingPegawai } =
    useGetPegawaiQuery(undefined, { skip: !isOpen || isPegawaiMode });

  const [createKpiDefinition, { isLoading }] = useCreateKpiDefinitionMutation();

  const form = useForm<KpiFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  const ownerId = useWatch({ control: form.control, name: "ownerId" });
  const tahun = useWatch({ control: form.control, name: "tahun" });

  // Owner options: mode pegawai cukup diri sendiri, mode SDM dari list pegawai
  const ownerOptions = isPegawaiMode
    ? me
      ? [{ value: me.id.toString(), label: me.nama }]
      : []
    : pegawai.map((item) => ({
        value: item.id.toString(),
        label: `${item.nama}`,
      }));

  // parentOwnerId: mode pegawai dari `me.parent`, mode SDM dari owner yang dipilih di list pegawai
  const selectedOwner = pegawai.find((item) => item.id === ownerId);
  const parentOwnerId = isPegawaiMode
    ? (me?.parent ?? 0)
    : (selectedOwner?.parent ?? 0);
  const parentOwner = pegawai.find((item) => item.id === parentOwnerId);

  const { data: parentKpi, isFetching: parentKpiLoading } =
    useGetKpiDefinitionsQuery(
      {
        ownerId: parentOwnerId,
        tahun: tahun || new Date().getFullYear(),
      },
      { skip: !isOpen || !parentOwnerId || !tahun },
    );

  const parentKpiOptions = [
    { value: "none", label: "Tanpa Parent KPI" },

    ...(parentKpi?.map((item) => ({
      value: item.id?.toString() ?? "",
      label: `${item.kpiCode} - ${item.name}`,
    })) ?? []),
  ];

  useEffect(() => {
    if (isOpen) {
      form.reset(getDefaultValues(isPegawaiMode ? (me?.id ?? 0) : 0));
    }
  }, [form, isOpen, isPegawaiMode, me?.id]);

  useEffect(() => {
    form.setValue("parentKpiId", null);
  }, [form, ownerId, tahun]);

  const handleClose = () => {
    if (!isLoading) onClose();
  };

  const onSubmit = async (values: KpiFormValues) => {
    try {
      const payload =
        isPegawaiMode && me
          ? {
              ...values,
              ownerId: me.id,
            }
          : values;

      await createKpiDefinition(payload).unwrap();
      toast.success("KPI berhasil dibuat");
      onClose();
    } catch (error) {
      const apiError = error as { data?: { message?: string } };
      toast.error(apiError.data?.message ?? "KPI gagal dibuat");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent
        className="sm:max-w-2xl h-[calc(80vh-2rem)] flex flex-col "
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            Create KPI {isPegawaiMode ? "Pegawai" : "SDM"}
          </DialogTitle>
          <DialogDescription>
            Lengkapi informasi definisi KPI di bawah ini.
          </DialogDescription>
        </DialogHeader>

        <div className=" h-full overflow-y-auto px-1 w-full">
          <Form {...form}>
            <form
              className="grid gap-2 sm:grid-cols-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Nama KPI</FormLabel>
                    <FormControl>
                      <Input placeholder="Revenue Growth" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tahun"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun</FormLabel>
                    <FormControl>
                      <Input type="number" min={2000} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit / Nama Departemen</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Finance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="STAFF">Staff</SelectItem>
                        <SelectItem value="VP">VP</SelectItem>
                        <SelectItem value="MANAGER">Manager</SelectItem>
                        <SelectItem value="BOD">BOD</SelectItem>
                        <SelectItem value="COMPANY">Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ownerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner</FormLabel>
                    <FormControl>
                      <Combobox
                        disabled={isPegawaiMode || isLoadingPegawai}
                        options={ownerOptions}
                        value={field.value.toString()}
                        onChange={(value) => field.onChange(Number(value))}
                      />
                    </FormControl>
                    {!isPegawaiMode && isLoadingPegawai && (
                      <p className="text-xs text-muted-foreground">
                        Memuat data pegawai...
                      </p>
                    )}
                    {/* {isPegawaiMode && (
                      <p className="text-xs text-muted-foreground">
                        Owner: {me?.nama ?? "User aktif"}
                      </p>
                    )} */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentKpiId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent KPI (opsional)</FormLabel>
                    <FormControl>
                      <Combobox
                        disabled={
                          parentKpiLoading || !ownerId || !parentOwnerId
                        }
                        options={parentKpiOptions}
                        value={field.value?.toString() ?? "none"}
                        onChange={(value) =>
                          field.onChange(
                            value === "none" || value === ""
                              ? null
                              : Number(value),
                          )
                        }
                      />
                    </FormControl>
                    {parentKpiLoading && (
                      <p className="text-xs text-muted-foreground">
                        Memuat data KPI parent...
                      </p>
                    )}
                    {/* {!parentKpiLoading && ownerId > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {parentOwnerId
                          ? isPegawaiMode
                            ? `KPI milik atasan (ID ${parentOwnerId})`
                            : `KPI milik atasan: ${
                                parentOwner?.nama || `ID ${parentOwnerId}`
                              }`
                          : "Owner tidak memiliki parent/atasan."}
                      </p>
                    )} */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kpiCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode KPI</FormLabel>
                    <FormControl>
                      <Input placeholder="1.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bobot (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cascadeRatio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cascade Ratio (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <textarea
                        className="flex min-h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        placeholder="Meningkatkan pertumbuhan revenue perusahaan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter className="mt-2 sm:col-span-2">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={handleClose}
          >
            Batal
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isLoading ? "Menyimpan..." : "Simpan KPI"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
