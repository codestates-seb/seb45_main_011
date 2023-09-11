import { create } from 'zustand';

export interface GardenModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const usePostModalStore = create<GardenModalState>((set) => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
}));

export default usePostModalStore;
