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

  useEffectOnce(() => {
    if (userId !== pathUserId) {
      router.back();
    }
  });

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[600px] border-gradient">
        <Screws />
        <div className="p-5 h-full">
          <div className="w-full h-full flex flex-col overflow-y-scroll scrollbar">
            <PageTitle text="식물 카드 등록" className="mb-5" />
            <LeafForm userId={userId} mode="add" />
          </div>
        </div>
      </div>
    </div>
  );
}
