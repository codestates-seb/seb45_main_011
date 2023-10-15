import { create } from 'zustand';

export interface GardenModalState {
  isOpen: boolean;
  type: 'post' | 'comment' | null;

  open: () => void;
  close: () => void;

  setType: (type: 'post' | 'comment' | null) => void;
}

const usePostModalStore = create<GardenModalState>((set) => ({
  isOpen: false,
  type: null,

  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),

  setType: (type: 'post' | 'comment' | null) => set(() => ({ type })),
}));

export default usePostModalStore;
