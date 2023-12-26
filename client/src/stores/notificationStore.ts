import { create } from 'zustand';

interface notificationState {
  isClicked: boolean;

  setIsClicked: (isClicked: boolean) => void;
}

const useNotificationStore = create<notificationState>((set) => ({
  isClicked: false,

  setIsClicked: (isClicked) => set(() => ({ isClicked })),
}));

export default useNotificationStore;
