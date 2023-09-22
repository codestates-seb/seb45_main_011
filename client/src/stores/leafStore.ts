import { DiaryDataInfo } from '@/types/data';
import { create } from 'zustand';

interface LeafState {
  isModalOpen: boolean;
  modalCategory: 'add' | 'delete' | 'edit' | 'share' | null;
  targetDiary: DiaryDataInfo | null;
  lastDiaryDay: Date | null;
  startDay: Date | null;
  isOwner: boolean;

  modalOpen: () => void;
  modalClose: () => void;

  setModalCategory: (
    modalCategory: 'add' | 'delete' | 'edit' | 'share' | null,
  ) => void;
  setTargetDiary: (diary: DiaryDataInfo) => void;
  setLastDiaryDay: (day: Date) => void;
  setStartDay: (day: Date) => void;
  setIsOwner: (isOwner: boolean) => void;
}

const useLeafStore = create<LeafState>((set) => ({
  isModalOpen: false,
  modalCategory: null,
  targetDiary: null,
  lastDiaryDay: null,
  startDay: null,
  isOwner: false,

  modalOpen: () => set(() => ({ isModalOpen: true })),
  modalClose: () => set(() => ({ isModalOpen: false })),

  setModalCategory: (modalCategory) => set(() => ({ modalCategory })),
  setTargetDiary: (diary) => set(() => ({ targetDiary: diary })),
  setLastDiaryDay: (day) => set(() => ({ lastDiaryDay: day })),
  setStartDay: (day) => set(() => ({ startDay: day })),
  setIsOwner: (isOwner) =>
    set(() => ({
      isOwner,
    })),
}));

export default useLeafStore;
