import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const StorageKey = 'user-key';

interface User {
  isLogin: boolean;
  isGoogleLogin: boolean;

  accessToken: string;
  refershToken: string;

  displayName: string;
  profileImageUrl: string;

  setIsLogin: (isLogin: boolean) => void;
  setIsGoogleLogin: (isGoogleLogin: boolean) => void;

  setAccessToken: (accessToken: string) => void;
  setRefershToken: (refershToken: string) => void;

  setDisplayName: (displayName: string) => void;
  setProfileImageUrl: (profileImageUrl: string) => void;
}

const usePesistStore = create(
  persist<User>(
    (set) => ({
      isLogin: false,
      isGoogleLogin: false,

      accessToken: '',
      refershToken: '',

      displayName: '',
      profileImageUrl: '',

      setIsLogin: (isLogin) => {
        set({ isLogin: isLogin });
      },
      setIsGoogleLogin: (isGoogleLogin) => {
        set({ isGoogleLogin: isGoogleLogin });
      },

      setAccessToken: (accessToken) => {
        set({ accessToken: accessToken });
      },
      setRefershToken: (refershToken) => {
        set({ refershToken: refershToken });
      },

      setDisplayName: (displayName) => {
        set({ displayName: displayName });
      },
      setProfileImageUrl: (profileImageUrl) => {
        set({ profileImageUrl: profileImageUrl });
      },
    }),
    {
      name: StorageKey,
    },
  ),
);

export default usePesistStore;
