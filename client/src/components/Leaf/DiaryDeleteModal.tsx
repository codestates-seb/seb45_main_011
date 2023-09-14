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
    <div className="w-full px-[2rem] py-[1.5rem] flex flex-col justify-center">
      <p className="text-center font-bold text-[1.45rem] leading-9 text-brown-90 mb-3 break-words">
        게시글로 등록한 일지의 <br className="hidden max-[400px]:inline" />
        경우 <b className="text-red-50">함께 삭제</b>
        됩니다.
      </p>
      <p className="text-center font-bold text-[1.6rem] leading-8 text-brown-70 mb-6 break-words">
        그래도 <br className="hidden max-[400px]:inline" />
        삭제하시겠습니까?
      </p>
      <div className="flex gap-3 justify-center">
        <CommonButton type="button" size="md" onClick={handleDeleteDiary}>
          삭제
        </CommonButton>
        <CommonButton type="button" size="md" onClick={handleCancelModal}>
          취소
        </CommonButton>
      </div>
    </div>
  );
}
