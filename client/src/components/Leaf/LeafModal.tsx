import useLeafStore from '@/stores/leafStore';

import DiaryForm from './DiaryForm';
import { DiaryDeleteModal } from './DiaryDeleteModal';

interface LeafModalProps {
  modalCategory: 'add' | 'edit' | 'delete' | null;
  leafId: number;
  userId: number;
}

export default function LeafModal({
  modalCategory,
  leafId,
  userId,
}: LeafModalProps) {
  const { targetDiary } = useLeafStore();

  if (modalCategory === 'add')
    return <DiaryForm leafId={leafId} userId={userId} mode={modalCategory} />;

  if (modalCategory === 'edit' && targetDiary)
    return (
      <DiaryForm
        leafId={leafId}
        userId={userId}
        diaryId={targetDiary?.journalId}
        title={targetDiary?.title}
        content={targetDiary?.content}
        imageUrl={targetDiary?.imageUrl}
        mode={modalCategory}
      />
    );

  if ((modalCategory = 'delete'))
    return (
      <DiaryDeleteModal
        leafId={leafId}
        userId={userId}
        deleteTargetId={targetDiary?.journalId}
      />
    );

  return null;
}
