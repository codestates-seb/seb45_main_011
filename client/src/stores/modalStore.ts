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

export type HistoryType =
  | 'ResignModal'
  | 'ConfirmModal'
  | 'ResignSuccessedModal'
  | 'ResignFailureModal';

export type ProfileType =
  | 'ChangePasswordModal'
  | 'ChangeNicknameModal'
  | 'ChangeImageModal';

export type ModalType =
  | PostType
  | GardenType
  | SignType
  | HistoryType
  | ProfileType
  | null;

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
