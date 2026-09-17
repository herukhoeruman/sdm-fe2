"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
  useGetPegawaiQuery,
} from "@/lib/redux";

const formSchema = z.object({
  name: z.string().trim().min(1, "Nama KPI wajib diisi"),
  description: z.string().trim().min(1, "Deskripsi wajib diisi"),
  unit: z.string().trim().min(1, "Nama departemen wajib diisi"),
  parentKpiId: z.preprocess(
    (value) => (value === "" || value === undefined ? null : Number(value)),
    z.number().int().positive("Parent KPI ID harus lebih dari 0").nullable(),
  ),
  ownerId: z.coerce.number().int().positive("Owner ID harus lebih dari 0"),
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
});

type KpiFormValues = z.infer<typeof formSchema>;

const getDefaultValues = (): KpiFormValues => ({
  name: "",
  description: "",
  unit: "",
  parentKpiId: null,
  ownerId: 0,
  weight: 40,
  cascadeRatio: 100,
  tahun: new Date().getFullYear(),
  level: "COMPANY",
});

export const KpiModal = () => {
  const { isOpen, onClose } = useKpiModal();
  const { data: pegawai = [], isLoading: isLoadingPegawai } =
    useGetPegawaiQuery(undefined, { skip: !isOpen });
  const [createKpiDefinition, { isLoading }] = useCreateKpiDefinitionMutation();
  const form = useForm<KpiFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });
  const ownerOptions = pegawai.map((item) => ({
    value: item.id.toString(),
    label: `${item.nama}`,
  }));
  const parentKpiOptions = [
    { value: "none", label: "Tanpa Parent KPI" },
    ...pegawai.map((item) => ({
      value: item.id.toString(),
      label: `${item.nama}`,
    })),
  ];

  useEffect(() => {
    if (isOpen) form.reset(getDefaultValues());
  }, [form, isOpen]);

  const handleClose = () => {
    if (!isLoading) onClose();
  };

  const onSubmit = async (values: KpiFormValues) => {
    try {
      await createKpiDefinition(values).unwrap();
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create KPI</DialogTitle>
          <DialogDescription>
            Lengkapi informasi definisi KPI di bawah ini.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="grid gap-4 sm:grid-cols-2"
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
              name="description"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Meningkatkan pertumbuhan revenue perusahaan"
                      {...field}
                    />
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
                <FormItem className="flex flex-col">
                  <FormLabel>Owner</FormLabel>
                  <FormControl>
                    <Combobox
                      options={ownerOptions}
                      value={field.value.toString()}
                      onChange={(value) => field.onChange(Number(value))}
                    />
                  </FormControl>
                  {isLoadingPegawai && (
                    <p className="text-xs text-muted-foreground">
                      Memuat data pegawai...
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentKpiId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Parent KPI (opsional)</FormLabel>
                  <FormControl>
                    <Combobox
                      options={parentKpiOptions}
                      value={field.value?.toString() ?? "none"}
                      onChange={(value) =>
                        field.onChange(value === "none" ? null : Number(value))
                      }
                    />
                  </FormControl>
                  {isLoadingPegawai && (
                    <p className="text-xs text-muted-foreground">
                      Memuat data pegawai...
                    </p>
                  )}
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
              name="tahun"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Tahun</FormLabel>
                  <FormControl>
                    <Input type="number" min={2000} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-2 sm:col-span-2">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={handleClose}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Menyimpan..." : "Simpan KPI"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
