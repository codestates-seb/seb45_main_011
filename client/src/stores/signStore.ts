import { create } from 'zustand';

interface SignState {
  isEmailSignup: boolean;
  isEmailSignin: boolean;
  code: string;

  setCode: (code: string) => void;

  getSignupForm: (isEmailSignup: boolean) => void;
  getSigninForm: (isEmailSignin: boolean) => void;
}

const useSignStore = create<SignState>((set) => ({
  isEmailSignup: false,
  isEmailSignin: false,
  code: '',
  googleProfileImage: '',

  setCode: (newCode) => set({ code: newCode }),

  getSigninForm: (isEmailSignin) => set({ isEmailSignin }),
  getSignupForm: (isEmailSignup) => set({ isEmailSignup }),
}));

export default useSignStore;
