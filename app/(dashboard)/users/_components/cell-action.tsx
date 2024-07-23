"use client";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
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
import { useEffect, useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import Link from "next/link";
import { useUserModal } from "@/hooks/use-user-modal";
import { User } from "./columns";
import { getData } from "@/lib/fetcher";

interface CellActionProps {
  data: User;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const params = useParams();

  const userModal = useUserModal();

  const [roles, setRoles] = useState<{ role: string }[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(`/api/data/user/roles`);

        // wait data to be fetched
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // change data

        setRoles(response?.data);
        console.log(response?.data);
      } catch (error) {
        console.log(error);
        setRoles([]);
      }
    };

    fetchData();
  }, []);

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
            onClick={() => {
              userModal.onOpen(data);
            }}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update
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
