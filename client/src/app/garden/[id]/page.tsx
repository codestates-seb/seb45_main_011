'use client';

import useGardenModalStore, {
  GardenModalType,
} from '@/stores/gardenModalStore';
import useUserStore from '@/stores/userStore';

import useSyncGarden from '@/hooks/useSyncGarden';

import LoadingNotice from '@/components/common/LoadingNotice';
import ErrorNotice from '@/components/common/ErrorNotice';
import {
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
  const { userId } = useUserStore();

  const { isLoading, isError } = useSyncGarden(params.id);

  const renderModal = (type: GardenModalType) => {
    if (type === 'leafExist') return <LeafExistModal />;
    if (type === 'noLeafExist') return <NoLeafExistModal />;
    if (type === 'selectLeaf') return <SelectLeafModal />;
    if (type === 'purchaseInfo') return <PurchaseInfoModal />;
    if (type === 'purchase') return <PurchaseModal />;
    if (type === 'emptyInventory') return <EmptyInventoryModal />;
  };

  if (isError) return <ErrorNotice isTransparent={false} />;

  const isMyself = userId === params.id;

  return (
    <div className="mx-auto">
      <div className="flex justify-center items-end mx-4 max-[984px]:flex-col max-[984px]:items-center max-[786px]:items-stretch">
        {isLoading ? (
          <LoadingNotice isTransparent={false} />
        ) : (
          <>
            <GardenMap isMyself={isMyself} />
            {isMyself && <GardenSidebar />}
          </>
        )}
      </div>
      {isOpen && renderModal(type)}
    </div>
  );
}
