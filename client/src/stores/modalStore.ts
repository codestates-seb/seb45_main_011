import { create } from 'zustand';

interface ModalState {
  isLeafExistModalOpen: boolean;
  isNoLeafExistModalOpen: boolean;
  setIsLeafExistModalOpen: (isLeafExistModalOpen: boolean) => void;
  setIsNoLeafExistModalOpen: (isNoLeafExistModalOpen: boolean) => void;
}

const useModalStore = create<ModalState>((set) => ({
  isLeafExistModalOpen: false,
  isNoLeafExistModalOpen: false,
  setIsLeafExistModalOpen: (isLeafExistModalOpen) =>
    set(() => ({ isLeafExistModalOpen })),
  setIsNoLeafExistModalOpen: (isNoLeafExistModalOpen) =>
    set(() => ({ isNoLeafExistModalOpen })),
}));

export default useModalStore;
