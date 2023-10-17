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
export type LeafsType = 'deleteLeaf' | 'share';
export type LeafType = 'add' | 'delete' | 'edit' | 'share';

export type ModalType = PostType | GardenType | LeafsType | LeafType | null;

export interface modalState {
  isOpen: boolean;
  type: ModalType;

  changeType: (type: ModalType) => void;
  open: () => void;
  close: () => void;
}

const useModalStore = create<modalState>((set) => ({
  isOpen: false,
  type: null,

  changeType: (type) => set(() => ({ type })),
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
}));

export default useModalStore;
