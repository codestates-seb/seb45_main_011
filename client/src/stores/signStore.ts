import { create } from 'zustand';

interface SignState {
  isLogin: boolean;
  isEmailSignup: boolean;
  isEmailSignin: boolean;
  code: string;
  setCode: (code: string) => void;
  setIsLogin: (isLogin: boolean) => void;
  getSignupForm: (isEmailSignup: boolean) => void;
  getSigninForm: (isEmailSignin: boolean) => void;
}

const useSignStore = create<SignState>((set) => ({
  isLogin: false,
  isEmailSignup: false,
  isEmailSignin: false,
  code: '',
  setCode: (newCode) => set({ code: newCode }),
  setIsLogin: (isLogin) => set({ isLogin }),
  getSigninForm: (isEmailSignin) => set({ isEmailSignin }),
  getSignupForm: (isEmailSignup) => set({ isEmailSignup }),
}));

export default useSignStore;
