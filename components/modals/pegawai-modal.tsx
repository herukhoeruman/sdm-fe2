"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { usePegawaiModal } from "@/hooks/use-pegawai-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  nama: z.string().min(1, { message: "nama tidak boleh kosong" }),
  email: z.string().email({ message: "email tidak valid" }),
  password: z.string().min(8, { message: "password minimal 8 karakter" }),
  username: z.string().min(4, { message: "username minimal 4 karakter" }),
  parent: z.number().int(),
  divisi: z.string(),
  jabatan: z.string(),
  namaAtasan: z.string(),
  penilaian: z.number().int(),
  validasiSdm: z.number().int(),
});

export const PegawaiModal = () => {
  const pegawaiModal = usePegawaiModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      setLoading(true);
      // throw new Error("Something went wrong!");

      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);

      toast.success("Store created successfully!");
      // console.log(response.data);
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Pegawai"
      description="Tambah data pegawai baru."
      isOpen={pegawaiModal.isOpen}
      onClose={pegawaiModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                name="parent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Parent Pegawai"
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
                        disabled={loading}
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
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Validasi SDM Pegawai"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={pegawaiModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
