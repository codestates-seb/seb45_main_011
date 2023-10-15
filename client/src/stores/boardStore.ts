import { create } from 'zustand';

import { BoardRankDataInfo } from '@/types/data';

interface BoardState {
  boardCategory: 'all' | 'search';
  searchKey: string | null;
  boardRank: BoardRankDataInfo[];

  setSearchKey: (searchKey: string | null) => void;
  setBoardRank: (boardRank: BoardRankDataInfo[]) => void;
}

const useBoardStore = create<BoardState>((set) => ({
  boardCategory: 'all',
  searchKey: null,
  boardRank: [],
  setSearchKey: (searchKey) =>
    set(() => ({
      searchKey,
    })),
  setBoardRank: (boardRank) => set(() => ({ boardRank })),
}));

export default useBoardStore;
