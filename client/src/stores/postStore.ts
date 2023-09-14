import { create } from 'zustand';

interface PostState {
  editMode: boolean;
  targetId: string | null;

  setEditMode: (editMode: boolean) => void;

  setTargetId: (id: string) => void;
}

const usePostStore = create<PostState>((set) => ({
  editMode: false,
  targetId: null,

  setEditMode: (editMode) => set(() => ({ editMode })),
  setTargetId: (targetId) => set(() => ({ targetId })),
}));

export default usePostStore;
