'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getLeafsByUserId } from '@/api/leaf';

import useLeafsStore from '@/stores/leafsStore';
import useUserStore from '@/stores/userStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import Leaf from '@/components/common/Leaf';
import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import AddLeafButton from '@/components/leafs/AddLeafButton';
import { LeafDeleteModal } from '@/components/leafs/LeafDeleteModal';
import LoadingNotice from '@/components/common/LoadingNotice';
import ErrorMessage from '@/components/common/ErrorMessage';
import ShareButton from '@/components/common/ShareButton';

import { LeafsDataInfo } from '@/types/data';

interface LeafsProps {
  params: { id: string };
}

export default function Leafs({ params }: LeafsProps) {
  const pathUserId = params.id;

  const { userId } = useUserStore();
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
  } = useQuery<LeafsDataInfo[]>({
    queryKey: ['leafs'],
    queryFn: () => getLeafsByUserId(pathUserId),
    enabled: !!userId,
  });

  return (
    <div className="flex justify-center items-center pt-[120px] pb-[60px]">
      <div className="relative w-full min-w-[312px] max-w-[732px] h-[528px] mx-4 border-gradient rounded-xl shadow-container">
        <ShareButton />
        <Screws />
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <LoadingNotice isTransparent={true} />
          </div>
        )}
        {isError && (
          <div className="w-full h-full flex justify-center items-center">
            <ErrorMessage />
          </div>
        )}
        {leafs && (
          <div className="pt-7 pb-4 pl-6 pr-5 flex flex-col gap-5">
            <PageTitle
              text={
                pathUserId === userId
                  ? '내 식물 카드'
                  : `${leafs[0].displayName} 님의 식물 카드`
              }
            />
            <div className="pt-2 pb-2 pl-2 pr-4 w-full h-[404px] overflow-y-scroll scrollbar grid grid-cols-3 gap-4 place-items-center items-start max-[730px]:grid-cols-2 max-[530px]:grid-cols-1">
              {userId === pathUserId && <AddLeafButton userId={+userId} />}
              {leafs?.map((leaf) => {
                const { leafId, leafName, leafImageUrl } = leaf;

                return (
                  <Leaf
                    key={leafId}
                    location="leaf"
                    name={leafName}
                    imageUrl={leafImageUrl}
                    leafId={String(leafId)}
                    pathUserId={pathUserId}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <LeafDeleteModal pathUserId={pathUserId} userId={userId} />
      )}
    </div>
  );
}
