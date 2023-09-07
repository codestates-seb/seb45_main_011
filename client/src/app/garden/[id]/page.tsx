'use client';

import Image from 'next/image';

import useGardenModalStore, {
  GardenModalType,
} from '@/stores/gardenModalStore';
import useUserStore from '@/stores/userStore';

import useSyncGarden from '@/hooks/useSyncGarden';
import useEffectOnce from '@/hooks/useEffectOnce';

import {
  EditModeButton,
  GardenMap,
  GardenSidebar,
  LeafExistModal,
  NoLeafExistModal,
  SelectLeafModal,
  PurchaseInfoModal,
  PurchaseModal,
  EmptyInventoryModal,
} from '@/components/garden';

interface GardenProps {
  params: { id: string };
}

export default function Garden({ params }: GardenProps) {
  const { isOpen, type } = useGardenModalStore();
  const { saveUserId } = useUserStore();

  const { isLoading, isError, point } = useSyncGarden(params.id);

  useEffectOnce(() => saveUserId(params.id));

  const renderModal = (type: GardenModalType) => {
    if (type === 'leafExist') return <LeafExistModal />;
    if (type === 'noLeafExist') return <NoLeafExistModal />;
    if (type === 'selectLeaf') return <SelectLeafModal />;
    if (type === 'purchaseInfo') return <PurchaseInfoModal />;
    if (type === 'purchase') return <PurchaseModal />;
    if (type === 'emptyInventory') return <EmptyInventoryModal />;
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생!</div>;

  return (
    <div className="mt-[52px] mx-auto">
      <section className="flex gap-2">
        <p className="flex items-center gap-[6px] min-w-max h-fit px-4 py-2 text-xl text-brown-70 font-bold border-8 border-b-0 border-border-30 rounded-t-xl bg-contain bg-repeat bg-[url('/assets/img/bg_wood_yellow.png')] leading-6">
          <Image
            src="/assets/img/point.svg"
            width={24}
            height={24}
            alt="포인트"
          />
          {point.toLocaleString('ko-KR')}
        </p>
        <EditModeButton />
      </section>
      <div className="flex gap-4">
        <GardenMap />
        <GardenSidebar />
      </div>
      {isOpen && renderModal(type)}
    </div>
  );
}
