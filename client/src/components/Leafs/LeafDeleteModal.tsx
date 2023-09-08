import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLeaf } from '@/api/LeafAPI';

import useLeafsStore from '@/stores/leafsStore';

import CommonButton from '../common/CommonButton';

export function LeafDeleteModal() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteLeaf,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leafs'] });
    },
  });

  const deleteTargetLeafsId = useLeafsStore(
    (state) => state.deleteTargetLeafsId,
  );
  const modalClose = useLeafsStore((state) => state.modalClose);

  const handleLeafDelete = () => {
    if (!deleteTargetLeafsId) return;

    mutate(deleteTargetLeafsId);
    modalClose();
  };

  const handleCancel = () => {
    modalClose();
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-[515px] h-[300px] px-[3.25rem]">
      <p className="text-center font-bold text-[1.75rem] leading-9 text-brown-90 mb-10">
        정원에 설치한 식물 카드의 경우{' '}
        <b className="text-red-50">연결이 해제</b>됩니다.
      </p>
      <p className="text-center font-bold text-[2rem] leading-8 text-brown-70 mb-[2.875rem]">
        그래도 삭제하시겠습니까?
      </p>
      <div className="flex gap-2 justify-center">
        <CommonButton type="button" size="lg" onClick={handleLeafDelete}>
          삭제
        </CommonButton>
        <CommonButton type="button" size="lg" onClick={handleCancel}>
          취소
        </CommonButton>
      </div>
    </div>
  );
}
