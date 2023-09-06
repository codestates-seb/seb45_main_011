import { create } from 'zustand';

export type GardenModalType =
  | 'leafExist'
  | 'noLeafExist'
  | 'selectLeaf'
  | 'purchaseInfo'
  | 'purchase'
  | 'emptyInventory'
  | null;

export interface GardenModalState {
  isOpen: boolean;
  type: GardenModalType;
  changeType: (type: GardenModalType) => void;
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
