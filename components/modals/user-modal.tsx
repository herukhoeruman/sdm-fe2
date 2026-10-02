"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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
import { useGetRolesQuery, useUpdateUserRolesMutation } from "@/lib/redux";

const formSchema = z.object({
  roles: z.array(z.string()),
});

export const UserModal = () => {
  const { isOpen, onClose, data } = useUserModal();

  const { data: roles = [] } = useGetRolesQuery(undefined, {
    skip: !isOpen,
  });
  const [updateUserRoles, { isLoading: loading }] =
    useUpdateUserRolesMutation();

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
      const response = await updateUserRoles({
        id: data!.id,
        roles: values.roles,
      }).unwrap();

      toast.success(response.message);
      onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (data?.roles) {
      const dataRoles = data.roles.map((role) => role.name);
      form.setValue("roles", dataRoles);
    }
  }, [data, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 text-black bg-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl text-center">
            Update role user
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 h-full">
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
