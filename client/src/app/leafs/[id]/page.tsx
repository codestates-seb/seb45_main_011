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
import { LeafDeleteModal } from '@/components/LeafDeleteModal';

export default function Leafs({ params }: { params: { id: string } }) {
  // URL path ID
  const leafs = useLeafsStore((state) => state.leafs);
  const userId = params.id;
  const setUserId = UserStore((state) => state.setUserId);
  setUserId(userId);

  const isLeafDeleteModalOpen = useModalStore(
    (state) => state.isLeafDeleteModalOpen,
  );

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
            <LeafDeleteModal />
          </Modal>
        </ModalPortal>
      ) : null}
    </div>
  );
}
