'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import useGardenStore from '@/stores/gardenStore';
import useModalStore from '@/stores/modalStore';

import EditModeButton from '@/components/EditModeButton';
import GardenMap from '@/components/GardenMap';
import GardenSidebar from '@/components/GardenSidebar';
import LeafConnectModal from '@/components/LeafConnectModal';
import SelectLeafModal from '@/components/SelectLeafModal';
import PurchaseInfoModal from '@/components/PurchaseInfoModal';
import PurchaseModal from '@/components/PurchaseModal';
import InventoryEmptyModal from '@/components/InventoryEmptyModal';

import { RawGardenInfo } from '@/types/data';

export default function Garden() {
  const { point, setPoint, setShop, setInventory, setPlants } =
    useGardenStore();
  const {
    isLeafExistModalOpen,
    isNoLeafExistModalOpen,
    isSelectLeafModalOpen,
    isPurchaseInfoModalOpen,
    isPurchaseModalOpen,
    isInventoryEmptyModalOpen,
  } = useModalStore();

  useEffect(() => {
    // fetch 가능성
    const { point, plantObjs, products } =
      require('@/mock/garden.json') as RawGardenInfo;

    const processedProducts = products.map((product, index) => ({
      id: index + 1,
      ...product,
    }));

    const inventory = plantObjs
      .filter(({ location }) => !location.isInstalled)
      .map((plant) => {
        const { plantObjId, productName, korName, imageUrlTable, price } =
          plant;

        return {
          id: plantObjId,
          name: productName,
          korName,
          imageUrlTable,
          price,
        };
      });

    setPoint(point);
    setShop(processedProducts);
    setInventory(inventory);
    setPlants(plantObjs);
  }, []);

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
      {(isLeafExistModalOpen || isNoLeafExistModalOpen) && <LeafConnectModal />}
      {isSelectLeafModalOpen && <SelectLeafModal />}
      {isPurchaseInfoModalOpen && <PurchaseInfoModal />}
      {isPurchaseModalOpen && <PurchaseModal />}
      {isInventoryEmptyModalOpen && <InventoryEmptyModal />}
    </div>
  );
}
