import { create } from 'zustand';

interface SignState {
  code: string;
  setCode: (code: string) => void;
}

const useSignStore = create<SignState>((set) => ({
  code: '',
  setCode: (code) => set({ code }),
}));

export default useSignStore;
