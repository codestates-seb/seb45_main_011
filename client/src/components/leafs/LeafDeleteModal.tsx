import useLeafsStore from '@/stores/leafsStore';

import useDeleteLeafMutation from '@/hooks/useDeleteLeafMutaion';

import CommonButton from '../common/CommonButton';
import ModalPortal from '../common/ModalPortal';
import Modal from '../common/Modal';

interface LeafDeleteModalProps {
  isOwner: boolean;
}

export default function LeafDeleteModal({ isOwner }: LeafDeleteModalProps) {
  if (!isOwner) return null;

  const { mutate } = useDeleteLeafMutation();

  const { deleteTargetLeafsId, modalClose } = useLeafsStore();

  const handleLeafDelete = () => {
    if (!deleteTargetLeafsId) return;

    mutate(deleteTargetLeafsId);
    modalClose();
  };

  const handleModalCancel = () => {
    modalClose();
  };

  return (
    <ModalPortal>
      <Modal>
        <div className="flex flex-col justify-center min-w-[312px] py-7 px-6">
          <p className="text-center font-bold text-[1.3rem] leading-7 text-brown-90 mb-3 mt-1 break-wrods">
            정원에 설치된 식물 카드는
            <b className="text-red-50">
              <br />
              연결이 해제
            </b>
            됩니다.
          </p>
          <p className="text-center font-bold text-[1.3rem] leading-7 text-brown-70 mb-5 break-words">
            그래도 삭제하시겠습니까?
          </p>
          <div className="flex gap-3 justify-center">
            <CommonButton type="button" size="md" onClick={handleLeafDelete}>
              삭제
            </CommonButton>
            <CommonButton type="button" size="md" onClick={handleModalCancel}>
              취소
            </CommonButton>
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
