'use client';

import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import LeafForm from '@/components/common/LeafForm';

interface AddLeafProps {
  params: { leafId: string; userId: string };
}

export default function AddLeaf({ params }: AddLeafProps) {
  const userId = Number(params.userId);

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
