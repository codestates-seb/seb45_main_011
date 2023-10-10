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

export type SignType =
  | 'FindPasswordModal'
  | 'SuccessedModal'
  | 'FailureModal'
  | 'AuthEmailModal';

export type ModalType = PostType | GardenType | SignType | null;

export interface ModalState {
  isOpen: boolean;
  type: ModalType;

  changeType: (type: ModalType) => void;
  open: () => void;
  close: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,

  changeType: (type) => set(() => ({ type })),
  open: () => set(() => ({ isOpen: true })),
  close: () => set(() => ({ isOpen: false })),
}));

export default useModalStore;
