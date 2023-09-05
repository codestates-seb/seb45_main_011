import useModalStore from '@/stores/modalStore';
import CommonButton from './common/CommonButton';

export function DiaryDeleteModal() {
  const setIsModalOpen = useModalStore((state) => state.setIsDiaryModalOpen);
  const handleCancelModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteDiary = () => {
    setIsModalOpen(false);
    // fetch(....)
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
        <CommonButton
          usage="button"
          size="lg"
          handleDeleteClick={handleDeleteDiary}>
          삭제
        </CommonButton>
        <CommonButton
          usage="button"
          size="lg"
          handleCancelClick={handleCancelModal}>
          취소
        </CommonButton>
      </div>
    </div>
  );
}
