import { create } from "zustand";

interface usePegawaiModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePegawaiModal = create<usePegawaiModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
