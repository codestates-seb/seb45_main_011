import useModalStore from '@/stores/modalStore';
import CommonButton from './common/CommonButton';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { deleteDiary } from '@/api/LeafAPI';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  const queryClient = new QueryClient();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteDiary,
    // mutate가 성공하면 리다이렉트
    onSuccess: () => {
      router.push(`/leaf/${userId}/${leafId}`);
      // 성공 후 새로운 쿼리를 다시 가져올 수 있도록 캐시 무효화
      queryClient.invalidateQueries(['leaf']);
    },
  });

  const setIsModalOpen = useModalStore((state) => state.setIsDiaryModalOpen);

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteDiary = () => {
    mutate(deleteTargetId);
    setIsModalOpen(false);
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
