'use client';

import { useRouter } from 'next/navigation';

import useTestUserStore from '@/stores/testUserStore';

import useEffectOnce from '@/hooks/useEffectOnce';

import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import LeafForm from '@/components/common/LeafForm';

interface AddLeafProps {
  params: { userId: string };
}

export default function AddLeaf({ params }: AddLeafProps) {
  const pathUserId = Number(params.userId);

  const router = useRouter();

  const userId = useTestUserStore((state) => state.userId);

  // userId와 pathId가 일치하지 않으면 비정상적인 접근 경로로 인식.
  useEffectOnce(() => {
    if (userId !== pathUserId) router.back();
  });

  return (
    <div className="flex justify-center items-center pt-[120px]">
      <div className="relative w-full min-w-[312px] max-w-[720px] h-full mx-4 border-gradient rounded-xl shadow-container">
        <Screws />
        <div className="p-5 h-full">
          <div className="w-full h-full flex flex-col overflow-y-scroll scrollbar">
            <PageTitle text="식물 카드 등록" className="mb-5" />
            <LeafForm userId={pathUserId} mode="add" />
          </div>
        </div>
      </div>
    </div>
  );
}
