import { User } from "@/app/(dashboard)/users/_components/columns";
import { create } from "zustand";

export interface Role {
  role: string;
}

interface useUserModalStore {
  data: User | null;
  roles: { role: string }[];
  isOpen: boolean;
  onOpen: (data?: User, roles?: Role[]) => void;
  onClose: () => void;
}

export const useUserModal = create<useUserModalStore>((set) => ({
  isOpen: false,
  data: {
    id: 0,
    nama: "",
    email: "",
    divisi: "",
    jabatan: "",
    roles: [],
    nama_atasan: "",
    parent: 0,
    penilaian: false,
    username: "",
    validasisdm: false,
  },
  roles: [],
  // onOpen: () => set({ isOpen: true }),
  onOpen: (
    data = {
      id: 0,
      nama: "",
      email: "",
      divisi: "",
      jabatan: "",
      roles: [],
      nama_atasan: "",
      parent: 0,
      penilaian: false,
      username: "",
      validasisdm: false,
    },
    roles = []
  ) => set({ isOpen: true, data, roles }), // Open the modal
  onClose: () => set({ isOpen: false }),
}));
