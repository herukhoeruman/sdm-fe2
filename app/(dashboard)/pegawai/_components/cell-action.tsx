"use client";

import { Copy, Edit, Eye, MoreHorizontal, Shield, Trash } from "lucide-react";
import toast from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { BillboardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Pegawai } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import Link from "next/link";
import { useDeletePegawaiMutation } from "@/lib/redux";
import { useUserModal } from "@/hooks/use-user-modal";

interface CellActionProps {
  data: Pegawai;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const userModal = useUserModal();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [deletePegawai, { isLoading: loading }] = useDeletePegawaiMutation();

  const onCopy = (id: number) => {
    console.log(id);
  };

  const onDelete = async () => {
    try {
      await deletePegawai(data.id).unwrap();
      router.refresh();
      router.push(`/pegawai`);
      toast.success("Pegawai deleted");
    } catch (error) {
      toast.error("Failed to delete pegawai");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menuu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Link href={`/pegawai/${data.id}`}>
            <DropdownMenuItem>
              <Eye className="w-4 h-4 mr-2" />
              Detail
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() => router.push(`/pegawai/${data.id}/update`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!data.roles}
            onSelect={() => userModal.onOpen({
              id: data.id,
              nama: data.nama,
              roles: (data.roles ?? []).map((role, index) => typeof role === "string" ? { id: index, name: role } : role),
            })}
          >
            <Shield className="w-4 h-4 mr-2" />
            Update Role
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
