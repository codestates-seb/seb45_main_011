import useLeafsStore from '@/stores/leafsStore';

import useDeleteLeafMutation from '@/hooks/useDeleteLeafMutaion';

import CommonButton from '../common/CommonButton';
import ModalPortal from '../common/ModalPortal';
import Modal from '../common/Modal';

interface LeafDeleteModalProps {
  pathUserId: string;
  userId: string | null;
}

export function LeafDeleteModal({ userId, pathUserId }: LeafDeleteModalProps) {
  if (userId !== pathUserId) return null;

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
      <Modal className="w-full max-w-[415px] min-w-[344px] mx-4">
        <div className="flex flex-col justify-center w-full py-8 px-6">
          <p className="text-center font-bold text-[1.45rem] leading-9 text-brown-90 mb-3 break-wrods">
            정원에 설치한 식물 카드의{' '}
            <br className='className="hidden max-[405px]:inline' />
            경우
            <b className="text-red-50"> 연결이 해제</b>됩니다.
          </p>
          <p className="text-center font-bold text-[1.6rem] leading-9 text-brown-70 mb-5 break-words">
            그래도 <br className="hidden max-[390px]:inline" />
            삭제하시겠습니까?
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
