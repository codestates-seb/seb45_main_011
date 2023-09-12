import { create } from 'zustand';

type usageType = 'post' | 'comment' | null;

export interface GardenModalState {
  isOpen: boolean;
  usage: usageType;

  open: () => void;
  close: () => void;

  setUsage: (usage: usageType) => void;
}

const usePostModalStore = create<GardenModalState>((set) => ({
  isOpen: false,
  usage: null,

  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),

  setUsage: (usage: usageType) => set(() => ({ usage })),
}));

export default usePostModalStore;
