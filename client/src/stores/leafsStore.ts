import { create } from 'zustand';

interface LeafsState {
  isModalOpen: boolean;
  deleteTargetLeafsId: string | null;
  modalCategory: 'deleteLeaf' | 'share' | null;
  isOwner: boolean;

  modalOpen: () => void;
  modalClose: () => void;

  setDeleteTargetId: (deleteTargetId: string) => void;
  setModalCategory: (modalCategory: 'deleteLeaf' | 'share' | null) => void;
  setIsOwner: (isOwner: boolean) => void;
}

const useLeafsStore = create<LeafsState>((set) => ({
  isModalOpen: false,
  deleteTargetLeafsId: null,
  modalCategory: null,
  isOwner: false,

  modalOpen: () => set(() => ({ isModalOpen: true })),
  modalClose: () => set(() => ({ isModalOpen: false })),
  setDeleteTargetId: (deleteTargetLeafsId) =>
    set(() => ({ deleteTargetLeafsId })),
  setModalCategory: (modalCategory) => set(() => ({ modalCategory })),
  setIsOwner: (isOwner) => set(() => ({ isOwner })),
}));

export default useLeafsStore;
