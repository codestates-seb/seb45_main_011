import { DiaryDataInfo } from '@/types/data';
import { create } from 'zustand';

interface LeafState {
  targetDiary: DiaryDataInfo | null;
  lastDiaryDay: Date | null;
  startDay: Date | null;
  isOwner: boolean;

  setTargetDiary: (diary: DiaryDataInfo) => void;
  setLastDiaryDay: (day: Date) => void;
  setStartDay: (day: Date) => void;
  setIsOwner: (isOwner: boolean) => void;
}

const useLeafStore = create<LeafState>((set) => ({
  modalCategory: null,
  targetDiary: null,
  lastDiaryDay: null,
  startDay: null,
  isOwner: false,

  setTargetDiary: (diary) => set(() => ({ targetDiary: diary })),
  setLastDiaryDay: (day) => set(() => ({ lastDiaryDay: day })),
  setStartDay: (day) => set(() => ({ startDay: day })),
  setIsOwner: (isOwner) =>
    set(() => ({
      isOwner,
    })),
}));

export default useLeafStore;
