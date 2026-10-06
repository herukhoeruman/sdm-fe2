"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  baseApi,
  clearToken,
  useDispatch,
  useGetMeQuery,
  useSignOutMutation,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";

export const UserNav = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { data } = useGetMeQuery();
  const [signOut, { isLoading }] = useSignOutMutation();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const logout = async () => {
    if (isLoading) return;
    try {
      await signOut().unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(clearToken());
      dispatch(baseApi.util.resetApiState());
      router.push("/");
      toast.success("Berhasil logout");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={logout}
        loading={isLoading}
        title="Konfirmasi logout"
        description="Apakah Anda yakin ingin keluar dari akun Anda?"
        cancelLabel="Batal"
        confirmLabel="Ya, logout"
        loadingLabel="Keluar..."
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.jpeg" alt={data?.username} />
              <AvatarFallback>{data?.username}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{data?.username}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {data?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => router.push("/profile")}>
              Profil Saya
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsLogoutOpen(true)}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
