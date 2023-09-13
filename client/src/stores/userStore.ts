import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const StorageKey = 'user-key';

interface User {
  isLogin: boolean;
  isGoogleLogin: boolean;

  accessToken: string;
  refershToken: string;

  userId: string;
  displayName: string;
  profileImageUrl: string;
  point: number;
  leafCard: number;

  setIsLogin: (isLogin: boolean) => void;
  setIsGoogleLogin: (isGoogleLogin: boolean) => void;

  setAccessToken: (accessToken: string) => void;
  setRefershToken: (refershToken: string) => void;

  setDisplayName: (displayName: string) => void;
  setProfileImageUrl: (profileImageUrl: string) => void;
  setPoint: (point: number) => void;
  saveUserId: (userId: string) => void;

  getLeafCard: (leafCard: number) => void;

  setClear: () => void;
}

const useUserStore = create(
  persist<User>(
    (set) => ({
      isLogin: false,
      isGoogleLogin: false,

      accessToken: '',
      refershToken: '',

      userId: '',
      displayName: '',
      profileImageUrl: '',
      point: 0,
      leafCard: 0,

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
      setPoint: (point) => {
        set({ point: point });
      },
      saveUserId: (userId) => {
        set({ userId });
      },
      getLeafCard: (leafCard) => {
        set({ leafCard });
      },
      setClear: () =>
        set({
          isLogin: false,
          isGoogleLogin: false,

          accessToken: '',
          refershToken: '',

          userId: '',
          displayName: '',
          profileImageUrl: '',
          point: 0,
          leafCard: 0,
        }),
    }),
    {
      name: StorageKey,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;
