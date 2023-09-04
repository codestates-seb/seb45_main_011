import { create } from 'zustand';

interface ModalState {
  isLeafExistModalOpen: boolean;
  isNoLeafExistModalOpen: boolean;
  isSelectLeafModalOpen: boolean;
  isPurchaseInfoModalOpen: boolean;
  isPurchaseModalOpen: boolean;
  isInventoryEmptyModalOpen: boolean;
  setIsLeafExistModalOpen: (isLeafExistModalOpen: boolean) => void;
  setIsNoLeafExistModalOpen: (isNoLeafExistModalOpen: boolean) => void;
  setIsSelectLeafModalOpen: (isSelectLeafModalOpen: boolean) => void;
  setIsPurchaseInfoModalOpen: (isPurchaseInfoModalOpen: boolean) => void;
  setIsPurchaseModalOpen: (isPurchaseModalOpen: boolean) => void;
  setIsInventoryEmptyModalOpen: (isInventoryEmptyModalOpen: boolean) => void;
}

const useModalStore = create<ModalState>((set) => ({
  isLeafExistModalOpen: false,
  isNoLeafExistModalOpen: false,
  isSelectLeafModalOpen: false,
  isPurchaseInfoModalOpen: false,
  isPurchaseModalOpen: false,
  isInventoryEmptyModalOpen: false,
  setIsLeafExistModalOpen: (isLeafExistModalOpen) =>
    set(() => ({ isLeafExistModalOpen })),
  setIsNoLeafExistModalOpen: (isNoLeafExistModalOpen) =>
    set(() => ({ isNoLeafExistModalOpen })),
  setIsSelectLeafModalOpen: (isSelectLeafModalOpen) =>
    set(() => ({ isSelectLeafModalOpen })),
  setIsPurchaseInfoModalOpen: (isPurchaseInfoModalOpen) =>
    set(() => ({ isPurchaseInfoModalOpen })),
  setIsPurchaseModalOpen: (isPurchaseModalOpen) =>
    set(() => ({ isPurchaseModalOpen })),
  setIsInventoryEmptyModalOpen: (isInventoryEmptyModalOpen) =>
    set(() => ({ isInventoryEmptyModalOpen })),
}));

export default useModalStore;
