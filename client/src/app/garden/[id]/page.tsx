'use client';

import useModalStore, { ModalType } from '@/stores/modalStore';
import useUserStore from '@/stores/userStore';

import useSyncGarden from '@/hooks/useSyncGarden';

import LoadingNotice from '@/components/common/LoadingNotice';
import ErrorNotice from '@/components/common/ErrorNotice';
import ShareModal from '@/components/common/ShareModal';
import ShareButton from '@/components/common/ShareButton';
import Footer from '@/components/common/Footer';
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
  const { isOpen, type } = useModalStore();
  const { userId } = useUserStore();

  const { isLoading, isError } = useSyncGarden(params.id);

  const renderModal = (type: ModalType) => {
    if (type === 'leafExist') return <LeafExistModal />;
    if (type === 'noLeafExist') return <NoLeafExistModal />;
    if (type === 'selectLeaf') return <SelectLeafModal />;
    if (type === 'purchaseInfo') return <PurchaseInfoModal />;
    if (type === 'purchase') return <PurchaseModal />;
    if (type === 'emptyInventory') return <EmptyInventoryModal />;
    if (type === 'share') return <ShareModal location="garden" />;
  };

  const isOwner = userId === params.id;

  return (
    <>
      <div className="h-auto min-h-full pb-[343px] mx-auto">
        <div className="flex justify-center items-end mx-4 max-[984px]:flex-col max-[984px]:items-center max-[786px]:items-stretch">
          {isLoading ? (
            <LoadingNotice
              isTransparent={false}
              className={`flex justify-center items-center shadow-container min-[984px]:w-[736px] min-[984px]:h-[544px] max-[984px]:w-[736px] max-[984px]:h-[544px] max-[782px]:w-full max-[420px]:h-[384px]`}
            />
          ) : isError ? (
            <ErrorNotice
              isTransparent={false}
              className={`flex justify-center items-center shadow-container min-[984px]:w-[736px] min-[984px]:h-[544px] max-[984px]:w-[736px] max-[984px]:h-[544px] max-[782px]:w-full max-[420px]:h-[384px]`}
            />
          ) : (
            <>
              <GardenMap isOwner={isOwner} />
              {isOwner && <GardenSidebar />}
            </>
          )}
        </div>
        <div className="pt-6  text-center">
          <ShareButton location="garden" position="bottom" />
        </div>
        {isOpen && renderModal(type)}
      </div>
      <Footer />
    </>
  );
}
