import { create } from "zustand";

export type KpiModalMode = "pegawai" | "sdm";

interface UseKpiModalStore {
  isOpen: boolean;
  mode: KpiModalMode;
  onOpen: (mode?: KpiModalMode) => void;
  onClose: () => void;
}

export const useKpiModal = create<UseKpiModalStore>((set) => ({
  isOpen: false,
  mode: "pegawai",
  onOpen: (mode = "pegawai") => set({ isOpen: true, mode }),
  onClose: () => set({ isOpen: false }),
}));
