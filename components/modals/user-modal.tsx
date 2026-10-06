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
  DialogDescription,
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

  const { data: roles = [], isFetching: rolesLoading, isError: rolesError, refetch } = useGetRolesQuery(undefined, {
    skip: !isOpen,
  });
  const [updateUserRoles, { isLoading: loading }] =
    useUpdateUserRolesMutation();

  // change data.roles from response to array
  const dataRoles = data?.roles.map((role) => role.name);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: dataRoles ?? [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!data || loading || rolesLoading || rolesError) return;
    try {
      const response = await updateUserRoles({
        id: data.id,
        roles: values.roles,
      }).unwrap();

      toast.success(response.message);
      onClose();
    } catch (error) {
      toast.error("Gagal memperbarui role. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    if (data?.roles) {
      const dataRoles = data.roles.map((role) => role.name);
      form.reset({ roles: dataRoles });
    }
  }, [data, form]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open && !loading) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Role — {data?.nama}</DialogTitle>
          <DialogDescription>
            Pilih role yang ingin diberikan kepada user ini.
          </DialogDescription>
        </DialogHeader>
        <div className="h-full">
          <div className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {rolesLoading && <p role="status" className="mb-4 text-sm text-muted-foreground">Memuat pilihan role...</p>}
                {rolesError && <div role="alert" className="mb-4 space-y-2 text-sm text-destructive">Gagal memuat pilihan role. <Button type="button" variant="outline" size="sm" onClick={() => refetch()}>Coba Lagi</Button></div>}
                <fieldset disabled={loading || rolesLoading || rolesError} className="min-w-0">
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
                </fieldset>

                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    type="button"
                    disabled={loading}
                    variant="outline"
                    onClick={onClose}
                  >
                    Batal
                  </Button>
                  <Button disabled={loading || rolesLoading || rolesError || !data} type="submit">
                    {loading ? "Menyimpan..." : "Simpan Role"}
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
