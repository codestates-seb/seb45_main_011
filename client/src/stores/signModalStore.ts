import { create } from 'zustand';

interface SignModalState {
  currentState: string;

  close: () => void;
  changeState: (currentState: string) => void;
}

const useSignModalStore = create<SignModalState>((set) => ({
  currentState: '',

  close: () => set({ currentState: '' }),
  changeState: (currentState) => set({ currentState }),
}));

export default useSignModalStore;
