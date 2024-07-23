"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useUserModal } from "@/hooks/use-user-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "../ui/multi-select";
import { getData } from "@/lib/fetcher";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  roles: z.array(z.string()),
});

export const UserModal = () => {
  const [roles, setRoles] = useState<{ role: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const { onOpen, isOpen, onClose, data } = useUserModal();
  const router = useRouter();

  // change data.roles from response to array
  const dataRoles = data?.roles.map((role) => role.name);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: dataRoles,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.put(
        process.env.NEXT_PUBLIC_API + `/api/data/user/${data?.id}/roles`,
        values,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      toast.success(response.data.message);
      onClose();
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(`/api/data/user/roles`);

        setRoles(response?.data);
      } catch (error) {
        console.log(error);
        setRoles([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data?.roles) {
      const dataRoles = data.roles.map((role) => role.name);
      form.setValue("roles", dataRoles);
    }
  }, [data, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden  text-black bg-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl text-center">
            Update role user
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 h-[400px]">
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="roles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roles</FormLabel>
                      <FormControl>
                        <MultiSelector
                          onValuesChange={field.onChange}
                          values={field.value}
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="Select roles" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList>
                              {/* {JSON.stringify(roles)} */}
                              {roles?.map((role, index) => (
                                <React.Fragment key={index}>
                                  <MultiSelectorItem value={role.role}>
                                    {role.role}
                                  </MultiSelectorItem>
                                </React.Fragment>
                              ))}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    type="button"
                    disabled={loading}
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    Update
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
