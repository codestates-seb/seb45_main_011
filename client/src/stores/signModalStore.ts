import { create } from 'zustand';
import { SignModal } from '@/types/common';

interface SignModalState {
  isOpen: boolean;
  type: SignModal;
  currentState: string;

  changeType: (type: SignModal) => void;
  open: () => void;
  close: () => void;
  failure: (currentState: string) => void;
  toggle: () => void;
  changeState: (currentState: string) => void;
}

const useSignModalStore = create<SignModalState>((set) => ({
  isOpen: false,
  rollback: '',
  currentState: '',
  type: null,
  changeType: (type) => set({ type }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, currentState: '' }),
  failure: (currentState) => set(() => ({ isOpen: true, currentState })),
  toggle: () =>
    set((state) => ({ isOpen: !state.isOpen, rollback: '', currentState: '' })),
  changeState: (currentState) => set({ currentState }),
}));

export default useSignModalStore;
