import { create } from 'zustand';

interface User {
  userId: string | null;
  saveUserId: (userId: string) => void;
}

const useUserStore = create<User>((set) => ({
  userId: null,
  saveUserId: (userId) => set(() => ({ userId })),
}));

export default useUserStore;
