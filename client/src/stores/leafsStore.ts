import { create } from 'zustand';

interface LeafsState {
  isModalOpen: boolean;
  deleteTargetLeafsId: string | null;

  modalOpen: () => void;
  modalClose: () => void;
  setDeleteTargetId: (deleteTargetId: string) => void;
}

const useLeafsStore = create<LeafsState>((set) => ({
  isModalOpen: false,
  deleteTargetLeafsId: null,

  modalOpen: () => set((state) => ({ ...state, isModalOpen: true })),
  modalClose: () => set((state) => ({ ...state, isModalOpen: false })),
  setDeleteTargetId: (deleteTargetLeafsId) =>
    set((state) => ({ ...state, deleteTargetLeafsId })),
}));

export default useLeafsStore;
