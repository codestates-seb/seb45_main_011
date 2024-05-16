import { create } from 'zustand';

import { ChatList } from '@/types/data';

interface ChatState {
  chatList: ChatList[];

  selected: string;
  message: string;
  title: string;
  roomId: string;
  questionerId: string;
  isOpen: boolean;
  isNewChatConnect: boolean;

  setChatList: (chatList: ChatList[]) => void;

  setSelected: (selected: string) => void;
  setMessage: (message: string) => void;
  setTitle: (title: string) => void;
  setRoomId: (roomId: string) => void;
  setQuestionerId: (questionerId: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsNewChatConnect: (isNewChat: boolean) => void;
}

const useChatStore = create<ChatState>((set) => ({
  chatList: [],

  selected: 'home',
  message: '',
  title: '',
  roomId: '',
  questionerId: '',

  isOpen: false,
  isNewChatConnect: false,

  setChatList: (chatList) => {
    set(() => ({ chatList }));
  },

  setSelected: (selected: string) => {
    set({ selected });
  },

  setMessage: (message) => {
    set({ message });
  },

  setTitle: (title) => {
    set({ title });
  },

  setRoomId(roomId) {
    set({ roomId });
  },

  setQuestionerId(questionerId) {
    set({ questionerId });
  },

  setIsOpen(isOpen) {
    set({ isOpen, selected: 'home' });
  },

  setIsNewChatConnect(isNewChatConnect) {
    set({ isNewChatConnect });
  },
}));

export default useChatStore;
