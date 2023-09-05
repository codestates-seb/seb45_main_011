'use client';

import useLeafsStore from '@/stores/leafsStore';
import UserStore from '@/stores/userStore';

import AddLeafButton from '@/components/AddLeafButton';
import Leaf from '@/components/common/Leaf';
import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import useModalStore from '@/stores/modalStore';
import ModalPortal from '@/components/common/ModalPortal';
import Modal from '@/components/common/Modal';
import CommonButton from '@/components/common/CommonButton';

export default function Leafs({ params }: { params: { id: string } }) {
  // URL path ID
  const leafs = useLeafsStore((state) => state.leafs);
  const userId = params.id;
  const setUserId = UserStore((state) => state.setUserId);
  setUserId(userId);

  const isLeafDeleteModalOpen = useModalStore(
    (state) => state.isLeafDeleteModalOpen,
  );
  const setIsLeafDeleteModalOpen = useModalStore(
    (state) => state.setIsLeafDeleteModalOpen,
  );

  const handleDeleteClickAtModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLeafDeleteModalOpen(false);
    // fetch(...)
  };

  const handleCancelClickAtModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLeafDeleteModalOpen(false);
  };
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[528px] border-gradient">
        <Screws />
        <div className="pt-5 pb-4 pl-6 pr-5 flex flex-col gap-5">
          <PageTitle text="내 식물 카드" />
          <div className="pr-3 w-full h-[404px] flex flex-wrap  gap-4 overflow-y-scroll scrollbar">
            <AddLeafButton />
            {leafs.map((leaf) => (
              <Leaf
                key={leaf.leafId}
                location="leaf"
                data={leaf}
                userId={userId}
              />
            ))}
          </div>
        </div>
      </div>

      {isLeafDeleteModalOpen ? (
        <ModalPortal>
          <Modal>
            <div className="flex flex-col justify-center w-full max-w-[531px] h-[316px] px-[3.25rem]">
              <p className="text-center font-bold text-[1.75rem] leading-9 text-brown-90 mb-10">
                정원에 설치한 식물 카드의 경우{' '}
                <b className="text-red-50">연결이 해제</b>됩니다.
              </p>
              <p className="text-center font-bold text-[2rem] leading-8 text-brown-70 mb-[2.875rem]">
                그래도 삭제하시겠습니까?
              </p>
              <div className="flex gap-1 justify-center">
                <CommonButton
                  usage="button"
                  size="lg"
                  handleDeleteClick={handleDeleteClickAtModal}>
                  삭제
                </CommonButton>
                <CommonButton
                  usage="button"
                  size="lg"
                  handleCancelClick={handleCancelClickAtModal}>
                  취소
                </CommonButton>
              </div>
            </div>
          </Modal>
        </ModalPortal>
      ) : null}
    </div>
  );
}
