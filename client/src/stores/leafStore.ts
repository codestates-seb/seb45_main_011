import create from 'zustand';

interface LeafState {
  isModalOpen: boolean;
  modalCategory: 'add' | 'delete' | null;
  diaryTargetId?: number | null;

  modalOpen: () => void;
  modalClose: () => void;

  setDiaryTargetId: (deleteTargetId: number) => void;
  setModalCategory: (modalCategory: 'add' | 'delete') => void;
}

const useLeafStore = create<LeafState>((set) => ({
  isModalOpen: false,
  modalCategory: null,
  diaryTargetId: null,

  modalOpen: () => set((state) => ({ ...state, isModalOpen: true })),
  modalClose: () => set((state) => ({ ...state, isModalOpen: false })),

  setDiaryTargetId: (diaryTargetId) =>
    set((state) => ({ ...state, diaryTargetId })),
  setModalCategory: (modalCategory) =>
    set((state) => ({ ...state, modalCategory })),
}));

export default useLeafStore;
