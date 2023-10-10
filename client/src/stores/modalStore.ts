import { create } from 'zustand';

export type PostType = 'post' | 'comment';

export type GardenType =
  | 'leafExist'
  | 'noLeafExist'
  | 'selectLeaf'
  | 'purchaseInfo'
  | 'purchase'
  | 'emptyInventory'
  | 'share';

export type ModalType = PostType | GardenType | null;

export interface GardenModalState {
  isOpen: boolean;
  type: ModalType;

  changeType: (type: ModalType) => void;
  open: () => void;
  close: () => void;
}

const useGardenModalStore = create<GardenModalState>((set) => ({
  isOpen: false,
  type: null,

  changeType: (type) => set(() => ({ type })),
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
}));

export default useGardenModalStore;
