import { create } from 'zustand';

interface PostState {
  editMode: boolean;
  targetId: number | null;

  setEditMode: (editMode: boolean) => void;

  setTargetId: (id: number) => void;
}

const usePostStore = create<PostState>((set) => ({
  editMode: false,
  targetId: null,

  setEditMode: (editMode) => set(() => ({ editMode })),
  setTargetId: (targetId) => set(() => ({ targetId })),
}));

export default usePostStore;
