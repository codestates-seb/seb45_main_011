import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const StorageKey = 'user-key';

interface UserInfo {
  accessToken: string;
  refreshToken: string;
  userId: string;
  displayName: string;
  profileImageUrl: string;
  isLogin?: boolean;
  isGoogleLogin?: boolean;
}
interface User extends UserInfo {
  setAccessToken: (accessToken: string) => void;
  setUser: (userInfo: UserInfo) => void;
  setGoogleUser: (userInfo: UserInfo) => void;

  setProfileImageUrl: (profileImageUrl: string) => void;
  setDisplayName: (displayName: string) => void;

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

      setAccessToken: (accessToken) => {
        set({ accessToken });
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
          isLogin: true,
          isGoogleLogin: false,
        });
      },

      setGoogleUser: (userInfo: UserInfo) => {
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
          isLogin: false,
          isGoogleLogin: true,
        });
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
          profileImageUrl: '/assets/img/bg_default_profile.png',
        }),
    }),
    {
      name: StorageKey,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;
