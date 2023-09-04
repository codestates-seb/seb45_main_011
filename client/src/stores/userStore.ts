import { LeafDataInfo } from '@/types/common';
import create from 'zustand';
import data from '@/mock/leaf.json';

interface User {
  userId: string | null;
  setUserId: (userId: string) => void;
}

const UserStore = create<User>((set) => ({
  userId: null,
  setUserId: (userId) => set(() => ({ userId })),
}));

export default UserStore;
