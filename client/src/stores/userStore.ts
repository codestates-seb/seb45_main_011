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
  isGuestMode?: boolean;
}
interface User extends UserInfo {
  setGoogleUser: (userInfo: UserInfo) => void;
  setEmailUser: (userInfo: UserInfo) => void;

  setGuestMode: (
    userId: string,
    accessToken: string,
    refreshToken: string,
  ) => void;

  setProfileImageUrl: (profileImageUrl: string) => void;
  setDisplayName: (displayName: string) => void;

  setClear: () => void;
}

const useUserStore = create(
  persist<User>(
    (set) => ({
      isEmailLogin: false,
      isGoogleLogin: false,
      isGuestMode: false,

      accessToken: '',
      refreshToken: '',

      userId: '',
      displayName: '',
      profileImageUrl: '',

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

      setGuestMode: (userId, accessToken, refreshToken) => {
        set({ userId, accessToken, refreshToken, isGuestMode: true });
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
          isGuestMode: false,

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
