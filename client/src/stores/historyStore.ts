import { create } from 'zustand';

interface UserInfo {
  profileImageUrl: string;
  displayName: string;
  grade: string;
  point: number;
}

interface HistoryState extends UserInfo {
  selectOption: string;

  setSelectOption: (selectOption: string) => void;

  setHistoryUser: (userInfo: UserInfo) => void;
}

const useHistoryStore = create<HistoryState>((set) => ({
  selectOption: 'boardWritten',

  profileImageUrl: '',
  displayName: '',
  grade: '',
  point: 0,

  setSelectOption: (selectOption) => set({ selectOption }),

  setHistoryUser: (userInfo: UserInfo) => {
    const { profileImageUrl, displayName, grade, point } = userInfo;
    set({
      profileImageUrl,
      displayName,
      grade,
      point,
    });
  },
}));

export default useHistoryStore;
