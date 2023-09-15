'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getLeafByLeafId } from '@/api/leaf';

import useUserStore from '@/stores/userStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import LeafForm from '@/components/common/LeafForm';

import { LeafDataInfo } from '@/types/data';

interface EditLeafProps {
  params: { userId: string; leafId: string };
}

export default function EditLeaf({ params }: EditLeafProps) {
  const leafId = params.leafId;
  const pathUserId = params.userId;

  const router = useRouter();

  const userId = useUserStore((state) => state.userId);

  useEffectOnce(() => {
    if (pathUserId !== userId) router.back();
  });

  const {
    data: leaf,
    isLoading,
    isError,
  } = userId === pathUserId
    ? useQuery<LeafDataInfo>({
        queryKey: ['leaf', leafId],
        queryFn: () => getLeafByLeafId(leafId),
      })
    : { data: null, isLoading: false, isError: false };

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  return (
    <div className="flex justify-center items-center pt-[120px]">
      <div className="relative w-full min-w-[312px] max-w-[540px] h-full mx-4 border-gradient rounded-xl shadow-container">
        <Screws />
        <div className="p-5 h-full">
          <div className="w-full h-full flex flex-col items-center overflow-y-scroll scrollbar">
            <PageTitle text="식물 카드 수정" className="mt-3 mb-6" />
            <LeafForm
              leaf={leaf}
              leafId={leafId}
              userId={pathUserId}
              mode="edit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
