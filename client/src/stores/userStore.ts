import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const StorageKey = 'user-key';

interface UserInfo {
  accessToken: string;
  refreshToken: string;
  userId: string;
  displayName: string;
  profileImageUrl: string;
}

interface User extends UserInfo {
  isLogin: boolean;
  isGoogleLogin: boolean;

  leafCard: number;

  setUser: (userInfo: UserInfo) => void;

  setIsLogin: (isLogin: boolean) => void;
  setIsGoogleLogin: (isGoogleLogin: boolean) => void;

  setProfileImageUrl: (profileImageUrl: string) => void;
  setDisplayName: (displayName: string) => void;

  getLeafCard: (leafCard: number) => void;

  setClear: () => void;
}

const useUserStore = create(
  persist<User>(
    (set) => ({
      isLogin: false,
      isGoogleLogin: false,

      accessToken: '',
      refreshToken: '',

      userId: '',
      displayName: '',
      profileImageUrl: '',

      leafCard: 0,

      setIsLogin: (isLogin) => {
        set({ isLogin: isLogin });
      },
      setIsGoogleLogin: (isGoogleLogin) => {
        set({ isGoogleLogin: isGoogleLogin });
      },

      setUser: (userInfo: UserInfo) => {
        const {
          accessToken,
          refreshToken,
          userId,
          displayName,
          profileImageUrl,
        } = userInfo;
        set({
          accessToken,
          refreshToken,
          userId,
          displayName,
          profileImageUrl,
        });
      },

      getLeafCard: (leafCard) => {
        set({ leafCard });
      },

      setProfileImageUrl: (profileImageUrl) => {
        set({ profileImageUrl });
      },
      setDisplayName: (displayName) => {
        set({ displayName });
      },

      setClear: () =>
        set({
          isLogin: false,
          isGoogleLogin: false,

          accessToken: '',
          refreshToken: '',

          userId: '',
          displayName: '',
          profileImageUrl: '',
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
