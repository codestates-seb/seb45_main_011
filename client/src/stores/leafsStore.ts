import { create } from 'zustand';

interface LeafsState {
  deleteTargetLeafsId: string | null;
  isOwner: boolean;

  setDeleteTargetId: (deleteTargetId: string) => void;
  setIsOwner: (isOwner: boolean) => void;
}

const useLeafsStore = create<LeafsState>((set) => ({
  deleteTargetLeafsId: null,
  isOwner: false,

  setDeleteTargetId: (deleteTargetLeafsId) =>
    set(() => ({ deleteTargetLeafsId })),
  setIsOwner: (isOwner) => set(() => ({ isOwner })),
}));

export default useLeafsStore;
