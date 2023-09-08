import { useMutation, useQueryClient } from '@tanstack/react-query';

import CommonButton from '../common/CommonButton';

import useLeafStore from '@/stores/leafStore';

import { deleteDiary } from '@/api/LeafAPI';

interface DiaryDeleteModalProps {
  deleteTargetId?: number | null;
  leafId: number;
  userId: number;
}

export function DiaryDeleteModal({
  userId,
  leafId,
  deleteTargetId,
}: DiaryDeleteModalProps) {
  if (!deleteTargetId) return null;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteDiary({ diaryId: deleteTargetId, userId }),
    onSuccess: () => {
      // 성공 후 새로운 쿼리를 다시 가져올 수 있도록 캐시 무효화
      queryClient.invalidateQueries(['diaries', leafId]);
    },
  });

  const modalClose = useLeafStore((state) => state.modalClose);

  const handleCancelModal = () => modalClose();
  const handleDeleteDiary = () => {
    modalClose();
    mutate();
  };
  return (
    <div className="flex flex-col justify-center w-full max-w-[515px] h-[300px] px-[4.5rem]">
      <p className="text-center font-bold text-[1.75rem] leading-9 text-brown-90 mb-10">
        게시글로 등록한 일지의 경우 <b className="text-red-50">함께 삭제</b>
        됩니다.
      </p>
      <p className="text-center font-bold text-[2rem] leading-8 text-brown-70 mb-[2.875rem]">
        그래도 삭제하시겠습니까?
      </p>
      <div className="flex gap-1 justify-center">
        <CommonButton type="button" size="lg" onClick={handleDeleteDiary}>
          삭제
        </CommonButton>
        <CommonButton type="button" size="lg" onClick={handleCancelModal}>
          취소
        </CommonButton>
      </div>
    </div>
  );
}
