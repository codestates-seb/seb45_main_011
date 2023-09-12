import { create } from 'zustand';

interface User {
  userId: number | null;
  userName: string | null;
  saveUserId: (userId: number) => void;
  saveUserName: (userName: string) => void;
}

const useTestUserStore = create<User>((set) => ({
  userId: 14,
  userName: 'test',
  saveUserId: (userId) => set(() => ({ userId })),
  saveUserName: (userName) => set(() => ({ userName })),
}));

export default useTestUserStore;
