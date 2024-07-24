"use client";
import { Edit, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { useUserModal } from "@/hooks/use-user-modal";
import { User } from "./columns";

interface CellActionProps {
  data: User;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();

  const userModal = useUserModal();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = (id: number) => {
    console.log(id);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/api/pegawai/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.refresh();
      router.push(`/pegawai`);
      toast.success("Pegawai deleted");
    } catch (error) {
      toast.error("Failed to delete pegawai");
    } finally {
      setLoading(false);
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
          <DropdownMenuItem
            onClick={() => {
              userModal.onOpen(data);
            }}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
