import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const StorageKey = 'user-key';

interface UserInfo {
  accessToken: string;
  refreshToken: string;

  userId: string;
  displayName: string;
  profileImageUrl: string;

  isEmailLogin?: boolean;
  isGoogleLogin?: boolean;
}
interface User extends UserInfo {
  setAccessToken: (accessToken: string) => void;

  setGoogleUser: (userInfo: UserInfo) => void;
  setEmailUser: (userInfo: UserInfo) => void;

  setProfileImageUrl: (profileImageUrl: string) => void;
  setDisplayName: (displayName: string) => void;

  setClear: () => void;
}

const useUserStore = create(
  persist<User>(
    (set) => ({
      isEmailLogin: false,
      isGoogleLogin: false,

      accessToken: '',
      refreshToken: '',

      userId: '',
      displayName: '',
      profileImageUrl: '',

      setAccessToken: (accessToken) => {
        set({ accessToken });
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
          isEmailLogin: false,
          isGoogleLogin: true,
        });
      },

      setEmailUser: (userInfo: UserInfo) => {
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
          isEmailLogin: true,
          isGoogleLogin: false,
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
          isEmailLogin: false,
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
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
