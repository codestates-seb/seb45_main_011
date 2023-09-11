import { create } from 'zustand';

interface HistoryState {
  selectOption: string;
  boards: {
    boardWritten: any[];
    boardLiked: any[];
    commentWritten: any[];
  };

  setSelectOption: (selectOption: string) => void;
  setBoards: (boards: {
    boardWritten: any[];
    boardLiked: any[];
    commentWritten: any[];
  }) => void;
}

const useHistoryStore = create<HistoryState>((set) => ({
  selectOption: 'boardWritten',
  boards: {
    boardWritten: [],
    boardLiked: [],
    commentWritten: [],
  },

  setSelectOption: (selectOption) => set({ selectOption }),
  setBoards: (boards) => set({ boards }),
}));

export default useHistoryStore;
