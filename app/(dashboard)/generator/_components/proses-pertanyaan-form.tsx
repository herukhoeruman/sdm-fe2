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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGenerateSdmProcessMutation, useGetMeQuery } from "@/lib/redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect } from "react";

interface Props {
  onSubmitSuccess: () => void;
}

const FormSchema = z.object({
  tahun: z.string().min(1, { message: "Tahun wajib diisi" }),
  semester: z.string().min(1, { message: "Semester wajib diisi" }),
  userId: z.number().min(1, { message: "User wajib diisi" }),
  tglJatuhTempo: z.coerce.date({
    errorMap: () => ({ message: "Tanggal jatuh tempo wajib diisi" }),
  }),
});

export const ProsesPertanyaanForm = ({ onSubmitSuccess }: Props) => {
  const router = useRouter();
  const { data: me } = useGetMeQuery();
  const [generateSdmProcess, { isLoading }] = useGenerateSdmProcessMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tahun: "",
      semester: "",
      userId: me?.id,
      tglJatuhTempo: undefined,
    },
  });

  useEffect(() => {
    if (me?.id) form.setValue("userId", me.id);
  }, [form, me?.id]);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await generateSdmProcess(values).unwrap();

      toast.success("Berhasil generate data");
      onSubmitSuccess();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Gagal generate data");
    }
  };

  // const years = Array.from(
  //   { length: 5 },
  //   (_, i) => new Date().getFullYear() - i
  // );

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i);

  years.sort((a, b) => b - a);

  const options = years.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-3">
            <FormField
              control={form.control}
              name="tahun"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel>Tahun</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tahun" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel>Semester</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
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

            <FormField
              control={form.control}
              name="tglJatuhTempo"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel>Tanggal jatuh tempo</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          disabled={isLoading}
                          variant={"outline"}
                          className={cn(
                            "w-full bg-card pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd MMM yyyy")
                          ) : (
                            <span>Pilih tanggal</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4  opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={isLoading}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end border-t pt-5">
            <Button
              className="w-full sm:w-auto"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  Memproses...
                </>
              ) : (
                "Generate Penilai"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
