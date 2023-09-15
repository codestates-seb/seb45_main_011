import { create } from 'zustand';

interface LeafsState {
  isModalOpen: boolean;
  deleteTargetLeafsId: string | null;
  modalCategory: 'deleteLeaf' | 'share' | null;

  modalOpen: () => void;
  modalClose: () => void;
  setDeleteTargetId: (deleteTargetId: string) => void;
  setModalCategory: (modalCategory: 'deleteLeaf' | 'share' | null) => void;
}

const useLeafsStore = create<LeafsState>((set) => ({
  isModalOpen: false,
  deleteTargetLeafsId: null,
  modalCategory: null,

  modalOpen: () => set(() => ({ isModalOpen: true })),
  modalClose: () => set(() => ({ isModalOpen: false })),
  setDeleteTargetId: (deleteTargetLeafsId) =>
    set(() => ({ deleteTargetLeafsId })),
  setModalCategory: (modalCategory) => set(() => ({ modalCategory })),
}));

export default useLeafsStore;
