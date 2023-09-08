'use client';

import { useQuery } from '@tanstack/react-query';

import AddLeafButton from '@/components/Leafs/AddLeafButton';
import { LeafDeleteModal } from '@/components/Leafs/LeafDeleteModal';

import Modal from '@/components/common/Modal';
import Leaf from '@/components/common/Leaf';
import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import ModalPortal from '@/components/common/ModalPortal';

import useLeafsStore from '@/stores/leafsStore';

import { getLeafs } from '@/api/LeafAPI';

import { LeafsDataInfo } from '@/types/data';

interface LeafsProps {
  params: { id: string };
}

export default function Leafs({ params }: LeafsProps) {
  const {
    data: leafs,
    isLoading,
    isError,
  } = useQuery<LeafsDataInfo[] | null>({
    queryKey: ['leafs'],
    queryFn: () => getLeafs(userId),
  });

  // URL path userId
  const userId = Number(params.id);

  const isModalOpen = useLeafsStore((state) => state.isModalOpen);

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[528px] border-gradient">
        <Screws />
        <div className="pt-5 pb-4 pl-6 pr-5 flex flex-col gap-5">
          <PageTitle text="내 식물 카드" />
          <div className="pr-3 w-full h-[404px] flex flex-wrap  gap-4 overflow-y-scroll scrollbar">
            <AddLeafButton userId={userId} />
            {leafs?.map((leaf) => (
              <Leaf
                key={leaf.leafId}
                location="leaf"
                name={leaf.leafName}
                imageUrl={leaf.leafImageUrl}
                leafId={leaf.leafId}
                userId={userId}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalPortal>
          <Modal>
            <LeafDeleteModal />
          </Modal>
        </ModalPortal>
      )}
    </div>
  );
}
