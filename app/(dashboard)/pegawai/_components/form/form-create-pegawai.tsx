"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Pegawai } from "../columns";
import { getData } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormCreatePegawaiProps {
  initialData: Pegawai | null;
}

const formSchema = z.object({
  nama: z.string().min(1, { message: "nama tidak boleh kosong" }),
  email: z.string().email({ message: "email tidak valid" }),
  password: z.string().min(4, { message: "password minimal 4 karakter" }),
  username: z.string().min(4, { message: "username minimal 4 karakter" }),
  parent: z.coerce.number(),
  divisi: z.string(),
  jabatan: z.string(),
  namaAtasan: z.string(),
  penilaian: z.coerce.number(),
  validasiSdm: z.coerce.number(),
});

export const FormCreatePegawai = ({ initialData }: FormCreatePegawaiProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Pegawai[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(`/api/pegawai`);

        setData(response?.data || []);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  const options = data.map((pegawai) => ({
    value: pegawai.id.toString(),
    label: pegawai.nama,
  }));

  const toastMessage = initialData ? "Pegawai updated." : "Pegawai created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
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
      setLoading(true);
      const token = sessionStorage.getItem("token");

      if (!initialData) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/pegawai`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
      } else {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API}/api/pegawai/${initialData.id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
      }

      toast.success(toastMessage);

      router.refresh();
      router.push("/pegawai");
    } catch (error) {
      console.log(error);
      toast.error("Gagal generate data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-4 md:w-2/4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
              <FormItem>
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
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Password Pegawai"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {initialData
                    ? "Kosongkan jika tidak ingin mengganti password"
                    : ""}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parent"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Parent</FormLabel>
                <FormControl>
                  <Combobox
                    options={options}
                    value={field.value.toString() || ""}
                    onChange={(value) => {
                      field.onChange(value);
                      console.log(value);
                      form.setValue(
                        "namaAtasan",
                        options.find((opt) => opt.value === value)?.label || ""
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
              <FormItem>
                <FormLabel>Divisi</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
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
              <FormItem>
                <FormLabel>Jabatan</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
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
              <FormItem>
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

          <FormField
            control={form.control}
            name="penilaian"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Penilaian</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
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
              <FormItem>
                <FormLabel>Validasi SDM</FormLabel>
                <Select
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

          <div className="pt-6 space-x-2 flex items-center justify-start w-full">
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
