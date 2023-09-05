'use client';

import Image from 'next/image';
import { useEffect } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import axios, { AxiosResponse } from 'axios';

// import { fetchGardenData } from '@/api/garden';
import useGardenStore from '@/stores/gardenStore';
import useGardenModalStore, {
  GardenModalType,
} from '@/stores/gardenModalStore';

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

import { RawGardenInfo } from '@/types/data';
// import { PlantObj, RawGardenInfo } from '@/types/data';

export default function Garden() {
  const { point, setPoint, setShop, setInventory, setPlants } =
    useGardenStore();
  const { isOpen, type } = useGardenModalStore();

  // const { data, isLoading, isError } = useQuery<RawGardenInfo>(
  //   ['garden'],
  //   fetchGardenData,
  // );

  // const inventory = data?.plantObjs
  //   .filter(({ location }) => !location.isInstalled)
  //   .map((plant) => {
  //     const { plantObjId, productName, korName, imageUrlTable, price } = plant;

  //     return {
  //       id: plantObjId,
  //       name: productName,
  //       korName,
  //       imageUrlTable,
  //       price,
  //     };
  //   });

  useEffect(() => {
    const { point, plantObjs, products } =
      require('@/mock/garden.json') as RawGardenInfo;

    const gardens = { point, plantObjs, products };

    syncGardens(gardens);
  }, []);

  // 스토어에 있는 데이터와 서버 데이터를 동기화한다는 의미
  // useEffectOnce에 콜백 함수로 전달
  // hook 사용하여 결합도 낮추거나, store에서 작업하거나, action으로 처리하거나
  const syncGardens = (gardens: RawGardenInfo) => {
    const { point, products, plantObjs } = gardens;

    const newInventory = plantObjs
      .filter(({ location }) => !location.isInstalled)
      .map((plant) => {
        const { plantObjId, productName, korName, imageUrlTable, price } =
          plant;

        return {
          productId: plantObjId,
          name: productName,
          korName,
          imageUrlTable,
          price,
        };
      });

    setPoint(point);
    setShop(products);
    setInventory(newInventory);
    setPlants(plantObjs);
  };

  const renderModal = (type: GardenModalType) => {
    if (type === 'leafExist') return <LeafExistModal />;
    if (type === 'noLeafExist') return <NoLeafExistModal />;
    if (type === 'selectLeaf') return <SelectLeafModal />;
    if (type === 'purchaseInfo') return <PurchaseInfoModal />;
    if (type === 'purchase') return <PurchaseModal />;
    if (type === 'emptyInventory') return <EmptyInventoryModal />;
  };

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
