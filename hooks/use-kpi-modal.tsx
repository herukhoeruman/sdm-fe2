import { create } from "zustand";

interface UseKpiModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useKpiModal = create<UseKpiModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
