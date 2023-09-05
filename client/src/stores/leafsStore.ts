import create from 'zustand';

import { LeafDataInfo } from '@/types/common';
import data from '@/mock/leaf.json';

interface LeafsState {
  leafs: LeafDataInfo[];
  addLeaf: (leaf: LeafDataInfo) => void;
}

const useLeafsStore = create<LeafsState>((set) => ({
  leafs: data,
  addLeaf: (leaf) => set((state) => ({ leafs: [...state.leafs, leaf] })),
}));

export default useLeafsStore;
