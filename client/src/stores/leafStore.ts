import { DiaryDataInfo } from '@/types/data';
import { create } from 'zustand';

interface LeafState {
  isModalOpen: boolean;
  modalCategory: 'add' | 'delete' | 'edit' | null;
  targetDiary: DiaryDataInfo | null;
  lastDiaryDay: string | null;

  modalOpen: () => void;
  modalClose: () => void;

  setModalCategory: (modalCategory: 'add' | 'delete' | 'edit') => void;
  setTargetDiary: (diary: DiaryDataInfo) => void;
  setLastDiaryDay: (day: string) => void;
}

const useLeafStore = create<LeafState>((set) => ({
  isModalOpen: false,
  modalCategory: null,
  targetDiary: null,
  lastDiaryDay: null,

  modalOpen: () => set((state) => ({ ...state, isModalOpen: true })),
  modalClose: () => set((state) => ({ ...state, isModalOpen: false })),

  setModalCategory: (modalCategory) =>
    set((state) => ({ ...state, modalCategory })),
  setTargetDiary: (diary) => set((state) => ({ ...state, targetDiary: diary })),
  setLastDiaryDay: (day) => set((state) => ({ ...state, lastDiaryDay: day })),
}));

export default useLeafStore;
