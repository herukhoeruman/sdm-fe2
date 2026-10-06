"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Pegawai } from "../columns";
import { Combobox } from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreatePegawaiMutation,
  useGetPegawaiQuery,
  useUpdatePegawaiMutation,
} from "@/lib/redux";

interface FormCreatePegawaiProps {
  initialData: Pegawai | null;
  accountOnly?: boolean;
}

const passwordSchema = z
  .string()
  .min(4, { message: "password minimal 4 karakter" });

const baseFormSchema = z.object({
  nama: z.string().min(1, { message: "nama tidak boleh kosong" }),
  email: z.string().email({ message: "email tidak valid" }),
  password: passwordSchema,
  username: z.string().min(4, { message: "username minimal 4 karakter" }),
  parent: z.coerce.number(),
  divisi: z.string(),
  jabatan: z.string(),
  namaAtasan: z.string(),
  penilaian: z.coerce.number(),
  validasiSdm: z.coerce.number(),
});

export const FormCreatePegawai = ({ initialData, accountOnly = false }: FormCreatePegawaiProps) => {
  const formSchema = baseFormSchema.extend({
    password: initialData
      ? passwordSchema.or(z.literal(""))
      : passwordSchema.min(1, { message: "password wajib diisi" }),
  });
  const { data = [] } = useGetPegawaiQuery(undefined, { skip: accountOnly });
  const [createPegawai, createState] = useCreatePegawaiMutation();
  const [updatePegawai, updateState] = useUpdatePegawaiMutation();
  const loading = createState.isLoading || updateState.isLoading;

  const router = useRouter();

  const options = (accountOnly && initialData ? [{ id: initialData.parent, nama: initialData.namaAtasan }] : data).map((pegawai) => ({
    value: pegawai.id.toString(),
    label: pegawai.nama,
  }));

  const toastMessage = accountOnly ? "Informasi akun berhasil diperbarui." : initialData ? "Pegawai updated." : "Pegawai created.";
  const returnPath = accountOnly ? "/profile" : "/pegawai";
  const action = initialData ? "Simpan Perubahan" : "Tambah Pegawai";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(accountOnly ? formSchema.pick({
      nama: true,
      email: true,
      username: true,
      password: true,
    }) : formSchema),
    defaultValues: initialData
      ? { ...initialData, validasiSdm: initialData.validasiSdm ?? 0, password: "" }
      : {
          nama: "",
          email: "",
          password: "",
          username: "",
          parent: 0,
          divisi: "",
          jabatan: "",
          namaAtasan: "",
          penilaian: 0,
          validasiSdm: 0,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // console.log(values);
      if (!initialData) {
        await createPegawai(values).unwrap();
      } else {
        const { password, ...pegawaiValues } = values;
        const body = accountOnly ? {
          ...pegawaiValues,
          parent: initialData.parent,
          divisi: initialData.divisi,
          jabatan: initialData.jabatan,
          namaAtasan: initialData.namaAtasan,
          penilaian: initialData.penilaian,
          validasiSdm: initialData.validasiSdm ?? 0,
        } : pegawaiValues;
        await updatePegawai({
          id: initialData.id,
          body: password ? { ...body, password } : body,
        }).unwrap();
      }

      toast.success(toastMessage);

      router.refresh();
      router.push(returnPath);
    } catch (error) {
      console.log(error);
      toast.error(accountOnly ? "Gagal memperbarui informasi akun." : "Gagal menyimpan data pegawai.");
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset
            disabled={loading}
            className="min-w-0 rounded-xl border border-t-4 border-t-primary/60 bg-card p-4 text-card-foreground shadow-sm shadow-primary/5 sm:p-6"
          >
            <legend className="rounded-lg bg-accent px-3 py-1 text-base font-semibold text-accent-foreground">
              Informasi Akun
            </legend>
            <p className="mb-5 text-sm text-muted-foreground">
              Lengkapi identitas dan akses akun pegawai.
            </p>
            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem className="min-w-0">
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Nama Pegawai"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="min-w-0">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Email Pegawai"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="min-w-0">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Username Pegawai"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="min-w-0">
                    <FormLabel>
                      Password {initialData ? "(opsional)" : "(wajib)"}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        aria-required={!initialData}
                        autoComplete="new-password"
                        disabled={loading}
                        placeholder="Password Pegawai"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {initialData
                        ? "Kosongkan jika tidak ingin mengganti password. Password baru minimal 4 karakter."
                        : "Gunakan password minimal 4 karakter."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <fieldset
            disabled={loading || accountOnly}
            className="min-w-0 rounded-xl border border-t-4 border-t-primary/60 bg-card p-4 text-card-foreground shadow-sm shadow-primary/5 sm:p-6"
          >
            <legend className="rounded-lg bg-accent px-3 py-1 text-base font-semibold text-accent-foreground">
              Informasi Pekerjaan
            </legend>
            <p className="mb-5 text-sm text-muted-foreground">
              {accountOnly ? "Informasi pekerjaan hanya dapat diubah oleh SDM." : "Atur divisi, jabatan, dan atasan pegawai."}
            </p>
            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="parent"
                render={({ field }) => (
                  <FormItem className="min-w-0">
                    <FormLabel>Atasan</FormLabel>
                    <FormControl>
                      <Combobox
                        disabled={loading || accountOnly}
                        options={options}
                        value={field.value.toString() || ""}
                        onChange={(value) => {
                          field.onChange(value);
                          console.log(value);
                          form.setValue(
                            "namaAtasan",
                            options.find((opt) => opt.value === value)?.label ||
                              "",
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="divisi"
                render={({ field }) => (
                  <FormItem className="min-w-0">
                    <FormLabel>Divisi</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading || accountOnly}
                        placeholder="Divisi Pegawai"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jabatan"
                render={({ field }) => (
                  <FormItem className="min-w-0">
                    <FormLabel>Jabatan</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading || accountOnly}
                        placeholder="Jabatan Pegawai"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="namaAtasan"
                render={({ field }) => (
                  <FormItem className="min-w-0 hidden">
                    <FormLabel>Nama Atasan</FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        placeholder="Nama Atasan Pegawai"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <fieldset
            disabled={loading || accountOnly}
            className="min-w-0 rounded-xl border border-t-4 border-t-primary/60 bg-card p-4 text-card-foreground shadow-sm shadow-primary/5 sm:p-6"
          >
            <legend className="rounded-lg bg-accent px-3 py-1 text-base font-semibold text-accent-foreground">
              Penilaian dan Validasi
            </legend>
            <p className="mb-5 text-sm text-muted-foreground">
              {accountOnly ? "Penilaian dan validasi hanya dapat diubah oleh SDM." : "Lengkapi penilaian dan status validasi SDM."}
            </p>
            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="penilaian"
                render={({ field }) => (
                  <FormItem className="min-w-0">
                    <FormLabel>Penilaian</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading || accountOnly}
                        placeholder="Penilaian Pegawai"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="validasiSdm"
                render={({ field }) => (
                  <FormItem className="min-w-0">
                    <FormLabel>Validasi SDM</FormLabel>
                    <Select
                      disabled={loading || accountOnly}
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select validasi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">False</SelectItem>
                        <SelectItem value="1">True</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <Button
              disabled={loading}
              type="button"
              variant="outline"
              onClick={() => router.push(returnPath)}
            >
              Batal
            </Button>
            <Button disabled={loading} type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
