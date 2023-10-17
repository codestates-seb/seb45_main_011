import useLeafsStore from '@/stores/leafsStore';
import useModalStore from '@/stores/modalStore';

import useDeleteLeafMutation from '@/hooks/mutation/useDeleteLeafMutaion';

import { CommonButton, ModalPortal, Modal } from '@/components/common';
import { LEAF_DELETE_MODAL_TEXT } from '@/constants/contents';

export default function LeafDeleteModal() {
  const { isOwner } = useLeafsStore();
  const { deleteTargetLeafsId } = useLeafsStore();
  const { close } = useModalStore();

  const { mutate: deleteLeaf } = useDeleteLeafMutation();

  const handleLeafDelete = () => {
    if (!deleteTargetLeafsId) return;

    deleteLeaf(deleteTargetLeafsId);
    close();
  };

  const handleModalCancel = () => {
    close();
  };

  if (!isOwner) return null;
  return (
    <ModalPortal>
      <Modal>
        <div className="flex flex-col justify-center min-w-[312px] py-7 px-6">
          <p className="text-center font-bold text-[1.3rem] leading-7 text-brown-90 mb-3 mt-1 break-wrods">
            {LEAF_DELETE_MODAL_TEXT.firstLine[0]}
            <b className="text-red-50">
              <br />
              {LEAF_DELETE_MODAL_TEXT.firstLine[1]}
            </b>
            {LEAF_DELETE_MODAL_TEXT.firstLine[2]}
          </p>
          <p className="text-center font-bold text-[1.3rem] leading-7 text-brown-70 mb-5 break-words">
            {LEAF_DELETE_MODAL_TEXT.secondLine}
          </p>
          <div className="flex gap-3 justify-center">
            <CommonButton type="button" size="md" onClick={handleLeafDelete}>
              {LEAF_DELETE_MODAL_TEXT.button[0]}
            </CommonButton>
            <CommonButton type="button" size="md" onClick={handleModalCancel}>
              {LEAF_DELETE_MODAL_TEXT.button[1]}
            </CommonButton>
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
