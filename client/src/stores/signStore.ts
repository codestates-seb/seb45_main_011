import { create } from 'zustand';

interface SignState {
  isCode: boolean;
  isEmailSignup: boolean;
  isEmailSignin: boolean;

  code: string;

  setIsCode: (isCode: boolean) => void;
  setCode: (code: string) => void;

  getSignupForm: (isEmailSignup: boolean) => void;
  getSigninForm: (isEmailSignin: boolean) => void;
}

const useSignStore = create<SignState>((set) => ({
  isCode: false,
  isEmailSignup: false,
  isEmailSignin: false,

  code: '',

  setIsCode: (isCode) => set({ isCode }),
  setCode: (newCode) => set({ code: newCode }),

  getSigninForm: (isEmailSignin) => set({ isEmailSignin }),
  getSignupForm: (isEmailSignup) => set({ isEmailSignup }),
}));

export default useSignStore;
