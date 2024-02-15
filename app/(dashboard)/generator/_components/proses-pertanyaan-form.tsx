"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Combobox } from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "@/lib/redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  tahun: z.string().min(1, { message: "Tahun tidak boleh kosong" }),
  semester: z.string().min(1, { message: "Semester tidak boleh kosong" }),
  userId: z.number().min(1, { message: "User tidak boleh kosong" }),
});

export const ProsesPertanyaanForm = () => {
  const router = useRouter();
  const { data: me } = useSelector((state) => state.getme);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tahun: "",
      semester: "",
      userId: me?.id,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      console.log(values);
      const token = sessionStorage.getItem("token");

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/api/data/sdmProsess`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/generator");
      toast.success("Data generate data");
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Gagal generate data");
    }
  };

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );
  const options = years.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <FormField
              control={form.control}
              name="tahun"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun</FormLabel>
                  <FormControl>
                    <Combobox options={options} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih semester" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Ganjil</SelectItem>
                      <SelectItem value="2">Genap</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
