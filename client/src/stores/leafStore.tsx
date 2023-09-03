import { LeafInfo } from '@/types/common';
import create from 'zustand';
import data from '@/mock/leaf.json';

interface Leaf {
  leafs: LeafInfo[];
  addLeaf: (leaf: LeafInfo) => void;
}

const LeafStore = create<Leaf>((set) => ({
  leafs: data,
  addLeaf: (leaf) => set((state) => ({ leafs: [...state.leafs, leaf] })),
}));

export default LeafStore;
