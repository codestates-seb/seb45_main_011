import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import CommonButton from './common/CommonButton';

import useLeafsStore from '@/stores/leafsStore';

import { deleteLeaf } from '@/api/LeafAPI';

interface LeafDeleteModal {
  userId: number;
}
export function LeafDeleteModal({ userId }: LeafDeleteModal) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteLeaf,
    // mutate가 성공하면 리다이렉트
    onSuccess: () => {
      router.push(`/leafs/${userId}`);
      // 성공 후 새로운 쿼리를 다시 가져올 수 있도록 캐시 무효화
      queryClient.invalidateQueries(['leafs']);
    },
    onError(error, variables, context) {
      console.log('fetch error');
    },
  });

  const modalClose = useLeafsStore((state) => state.modalClose);
  const deleteTargetLeafsId = useLeafsStore(
    (state) => state.deleteTargetLeafsId,
  );

  const handleCancel = () => {
    modalClose();
  };

  const handleDelete = () => {
    mutate(deleteTargetLeafsId);
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
        <CommonButton type="button" size="lg" onClick={handleDelete}>
          삭제
        </CommonButton>
        <CommonButton type="button" size="lg" onClick={handleCancel}>
          취소
        </CommonButton>
      </div>
    </div>
  );
}
