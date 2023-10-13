import useLeafStore from '@/stores/leafStore';

import useDeleteDiaryMutation from '@/hooks/useDeleteDiaryMutaion';

import { CommonButton } from '../common';

import { DIARY_DELETE_MODAL_TEXT } from '@/constants/contents';

interface DiaryDeleteModalProps {
  deleteTargetId?: string | null;
  leafId: string;
  userId: string;
}

export default function DiaryDeleteModal({
  userId,
  leafId,
  deleteTargetId,
}: DiaryDeleteModalProps) {
  const modalClose = useLeafStore((state) => state.modalClose);

  const { mutate: deleteDiary } = useDeleteDiaryMutation(leafId);

  if (!deleteTargetId) return null;

  const handleCancelModal = () => modalClose();

  const handleDeleteDiary = () => {
    modalClose();
    deleteDiary({ diaryId: deleteTargetId, userId });
  };

  return (
    <div className="w-[320px] px-[2rem] py-[1.5rem] flex flex-col justify-center">
      <p className="text-center font-bold text-[1.6rem] leading-8 text-brown-70 mb-1 break-words">
        {DIARY_DELETE_MODAL_TEXT.firstLine}
      </p>
      <p className="text-center font-bold text-[1.6rem] leading-8 text-brown-90 mb-4 break-words">
        {/* 그래도 <br className="hidden max-[400px]:inline" /> */}
        <b className="text-red-50">{DIARY_DELETE_MODAL_TEXT.secondLine[0]}</b>
        {DIARY_DELETE_MODAL_TEXT.secondLine[1]}
      </p>
      <div className="flex gap-3 justify-center">
        <CommonButton
          type="button"
          size="md"
          onClick={handleDeleteDiary}
          className="hover:scale-105 hover:transition-transform">
          {DIARY_DELETE_MODAL_TEXT.button[0]}
        </CommonButton>
        <CommonButton
          type="button"
          size="md"
          onClick={handleCancelModal}
          className="hover:scale-105 hover:transition-transform">
          {DIARY_DELETE_MODAL_TEXT.button[1]}
        </CommonButton>
      </div>
    </div>
  );
}
