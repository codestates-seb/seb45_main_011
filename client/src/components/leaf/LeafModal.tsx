import useLeafStore from '@/stores/leafStore';

import DiaryForm from './DiaryForm';
import { DiaryDeleteModal } from './DiaryDeleteModal';
import ModalPortal from '../common/ModalPortal';
import Modal from '../common/Modal';

import { ModalType } from '@/stores/modalStore';

interface LeafModalProps {
  modalCategory: ModalType;
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
    return (
      <ModalPortal>
        <Modal>
          <DiaryForm leafId={leafId} userId={userId} mode={modalCategory} />
        </Modal>
      </ModalPortal>
    );

  if (modalCategory === 'edit' && targetDiary) {
    const { journalId, title, content, imageUrl } = targetDiary;

    return (
      <ModalPortal>
        <Modal>
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
        <Modal>
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
