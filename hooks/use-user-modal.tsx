import type { UserResponse } from "@/lib/redux/services/userApi";
import { create } from "zustand";

export interface Role {
  role: string;
}

type RoleUser = Pick<UserResponse, "id" | "nama" | "roles">;

interface useUserModalStore {
  data: RoleUser | null;
  roles: Role[];
  isOpen: boolean;
  onOpen: (data: RoleUser, roles?: Role[]) => void;
  onClose: () => void;
}

export const useUserModal = create<useUserModalStore>((set) => ({
  isOpen: false,
  data: null,
  roles: [],
  onOpen: (data, roles = []) => set({ isOpen: true, data, roles }),
  onClose: () => set({ isOpen: false }),
}));
