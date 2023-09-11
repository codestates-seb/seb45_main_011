import { create } from 'zustand';

interface BoardState {
  boardCategory: 'all' | 'search';
  searchKey: string | null;
  setSearchKey: (searchKey: string) => void;
}

const useBoardStore = create<BoardState>((set) => ({
  boardCategory: 'all',
  searchKey: null,
  setSearchKey: (searchKey) =>
    set(() => ({
      searchKey,
    })),
}));

export default useBoardStore;
