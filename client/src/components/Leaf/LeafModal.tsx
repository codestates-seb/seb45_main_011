import useLeafStore from '@/stores/leafStore';
import DiaryForm from './DiaryForm';
import { DiaryDeleteModal } from './DiaryDeleteModal';

interface LeafModalProps {
  modalCategory: 'add' | 'edit' | 'delete' | null;
  leafId: string;
  userId: string;
}

export default function LeafModal({
  modalCategory,
  leafId,
  userId,
}: LeafModalProps) {
  const { targetDiary } = useLeafStore();

  if (modalCategory === 'add')
    return <DiaryForm leafId={leafId} userId={userId} mode={modalCategory} />;

  if (modalCategory === 'edit' && targetDiary) {
    const { journalId, title, content, imageUrl } = targetDiary;

    return (
      <DiaryForm
        leafId={leafId}
        userId={userId}
        diaryId={String(journalId)}
        title={title}
        content={content}
        imageUrl={imageUrl}
        mode={modalCategory}
      />
    );
  }

  if (modalCategory === 'delete' && targetDiary)
    return (
      <DiaryDeleteModal
        leafId={leafId}
        userId={userId}
        deleteTargetId={String(targetDiary.journalId)}
      />
    );

  return null;
}
