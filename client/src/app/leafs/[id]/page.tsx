'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getLeafsByUserId } from '@/api/leaf';

import useLeafsStore from '@/stores/leafsStore';
import useTestUserStore from '@/stores/testUserStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import Modal from '@/components/common/Modal';
import Leaf from '@/components/common/Leaf';
import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import ModalPortal from '@/components/common/ModalPortal';
import AddLeafButton from '@/components/Leafs/AddLeafButton';
import { LeafDeleteModal } from '@/components/Leafs/LeafDeleteModal';

import { LeafsDataInfo } from '@/types/data';

interface LeafsProps {
  params: { id: string };
}

export default function Leafs({ params }: LeafsProps) {
  // URL path userId
  const pathUserId = Number(params.id);

  const userId = useTestUserStore((state) => state.userId);
  const userName = useTestUserStore((state) => state.userName);
  const isModalOpen = useLeafsStore((state) => state.isModalOpen);

  const router = useRouter();

  useEffectOnce(() => {
    if (!userId) {
      router.push('/signin');
    }
  });

  const {
    data: leafs,
    isLoading,
    isError,
  } = userId
    ? useQuery<LeafsDataInfo[] | null>({
        queryKey: ['leafs'],
        queryFn: () => getLeafsByUserId(pathUserId),
      })
    : { data: null, isLoading: false, isError: false };

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  // TODO 클릭한 유저 정보 받아와야 한다. (클릭한 유저이름을 상태로 저장? 아니면 서버로 요청?)
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[528px] border-gradient">
        <Screws />
        <div className="pt-5 pb-4 pl-6 pr-5 flex flex-col gap-5">
          <PageTitle
            text={
              pathUserId === userId
                ? '내 식물 카드'
                : `${userName}님의 식물 카드`
            }
          />
          <div className="pr-3 w-full h-[404px] flex flex-wrap  gap-4 overflow-y-scroll scrollbar">
            {userId === pathUserId && <AddLeafButton userId={userId} />}
            {leafs?.map((leaf) => (
              <Leaf
                key={leaf.leafId}
                location="leaf"
                name={leaf.leafName}
                imageUrl={leaf.leafImageUrl}
                leafId={leaf.leafId}
                pathUserId={pathUserId}
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
