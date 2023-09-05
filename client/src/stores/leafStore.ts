import create from 'zustand';

import { DiaryInfo } from '@/types/common';

interface LeafState {
  diary: DiaryInfo | null;
  setDiary: (diary: DiaryInfo) => void;
}

const useLeafStore = create<LeafState>((set) => ({
  diary: null,

  setDiary: (diary) => set((state) => ({ diary })),
}));

export default useLeafStore;
