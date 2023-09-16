import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteDiary } from '@/api/leaf';

import useLeafStore from '@/stores/leafStore';

import CommonButton from '../common/CommonButton';

interface DiaryDeleteModalProps {
  deleteTargetId?: string | null;
  leafId: string;
  userId: string;
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
    <div className="w-[320px] px-[2rem] py-[1.5rem] flex flex-col justify-center">
      <p className="text-center font-bold text-[1.6rem] leading-8 text-brown-70 mb-1 break-words">
        선택한 일지를
      </p>
      <p className="text-center font-bold text-[1.6rem] leading-8 text-brown-90 mb-4 break-words">
        {/* 그래도 <br className="hidden max-[400px]:inline" /> */}
        <b className="text-red-50">삭제</b>하시겠습니까?
      </p>
      <div className="flex gap-3 justify-center">
        <CommonButton
          type="button"
          size="md"
          onClick={handleDeleteDiary}
          className="hover:scale-105 hover:transition-transform">
          삭제
        </CommonButton>
        <CommonButton
          type="button"
          size="md"
          onClick={handleCancelModal}
          className="hover:scale-105 hover:transition-transform">
          취소
        </CommonButton>
      </div>
    </div>
  );
}
