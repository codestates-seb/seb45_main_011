import create from 'zustand';

import { DiaryInfo } from '@/types/common';

interface LeafState {
  diary: DiaryInfo | null;
  modalCategory: 'add' | 'delete' | null;
  setDiary: (diary: DiaryInfo) => void;
  setModalCategory: (modalCategory: 'add' | 'delete') => void;
}

const useLeafStore = create<LeafState>((set) => ({
  diary: null,
  modalCategory: null,
  setDiary: (diary) => set((state) => ({ ...state, diary })),
  setModalCategory: (modalCategory) =>
    set((state) => ({ ...state, modalCategory })),
}));

export default useLeafStore;
