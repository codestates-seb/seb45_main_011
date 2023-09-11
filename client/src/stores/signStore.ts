import { create } from 'zustand';

interface SignState {
  isEmailSignup: boolean;
  isEmailSignin: boolean;
  isCorrectPassword: boolean;
  code: string;

  setCode: (code: string) => void;

  getSignupForm: (isEmailSignup: boolean) => void;
  getSigninForm: (isEmailSignin: boolean) => void;
  getPassword: (isCorrectPassword: boolean) => void;
}

const useSignStore = create<SignState>((set) => ({
  isEmailSignup: false,
  isEmailSignin: false,
  isCorrectPassword: false,

  googleProfileImage: '',
  code: '',

  setCode: (newCode) => set({ code: newCode }),

  getSigninForm: (isEmailSignin) => set({ isEmailSignin }),
  getSignupForm: (isEmailSignup) => set({ isEmailSignup }),
  getPassword: (isEmailSignup) => set({ isEmailSignup }),
}));

export default useSignStore;
