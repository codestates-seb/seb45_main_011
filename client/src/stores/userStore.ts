import { create } from 'zustand';

interface User {
  userId: string | null;
  setUserId: (userId: string) => void;
  saveUserId: (userId: string) => void;
}

const useUserStore = create<User>((set) => ({
  userId: null,
  setUserId: (userId) => set(() => ({ userId })),
  saveUserId: (userId) => set(() => ({ userId })),
}));

export default useUserStore;
