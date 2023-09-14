import useLeafStore from '@/stores/leafStore';

import DiaryForm from './DiaryForm';
import { DiaryDeleteModal } from './DiaryDeleteModal';
import ModalPortal from '../common/ModalPortal';
import Modal from '../common/Modal';

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
      <ModalPortal>
        <Modal className="w-full max-w-[531px] min-w-[312px] mx-4 h-fit">
          <DiaryForm
            leafId={leafId}
            userId={userId}
            diaryId={String(journalId)}
            title={title}
            content={content}
            imageUrl={imageUrl}
            mode={modalCategory}
          />
        </Modal>
      </ModalPortal>
    );
  }

  if (modalCategory === 'delete' && targetDiary)
    return (
      <ModalPortal>
        <Modal className="w-full max-w-[415px] min-w-[344px] mx-4">
          <DiaryDeleteModal
            leafId={leafId}
            userId={userId}
            deleteTargetId={String(targetDiary.journalId)}
          />
        </Modal>
      </ModalPortal>
    );

  return null;
}
