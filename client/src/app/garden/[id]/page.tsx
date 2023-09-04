'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import useGardenStore from '@/stores/gardenStore';
import EditModeButton from '@/components/EditModeButton';
import GardenMap from '@/components/GardenMap';
import GardenSidebar from '@/components/GardenSidebar';

import { RawGardenInfo } from '@/types/data';
import { PlantInfo } from '@/types/common';

export default function Garden() {
  const { point, setPoint, setShop, setInventory, setPlants } =
    useGardenStore();

  useEffect(() => {
    const { point, plantObjs, products } =
      require('@/mock/garden.json') as RawGardenInfo;

    const processedProducts = products.map((product, index) => ({
      id: index + 1,
      ...product,
    }));

    const inventory = plantObjs
      .filter(({ location }) => !location.isInstalled)
      .reduce(
        (inventory, currentPlant) => {
          const plant = processedProducts.find(
            ({ name }) => name === currentPlant.productName,
          );

          return plant
            ? [...inventory, { ...plant, id: currentPlant.plantObjId }]
            : inventory;
        },
        [] as PlantInfo[] | [],
      );

    setPoint(point);
    setShop(processedProducts);
    setInventory(inventory);
    setPlants(plantObjs);
  }, []);

  return (
    <>
      <section className="flex gap-2">
        <p className="flex items-center gap-[6px] w-fit h-fit px-4 py-2 text-xl text-brown-70 font-bold border-8 border-b-0 border-border-30 rounded-t-xl bg-contain bg-repeat bg-[url('/assets/img/bg_wood_yellow.png')] leading-6">
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
      <div className="flex gap-5">
        <GardenMap />
        <GardenSidebar />
      </div>
    </>
  );
}
