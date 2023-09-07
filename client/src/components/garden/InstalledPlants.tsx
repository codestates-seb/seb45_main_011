'use client';

import useArchive from '@/hooks/useArchive';

import Plant from './Plant';
import LeafTag from '@/components/LeafTag';

import { PlantObj } from '@/types/data';

interface InstalledPlantsProps {
  isEditMode: boolean;
  installedPlants: PlantObj[];
}

export default function InstalledPlants({
  isEditMode,
  installedPlants,
}: InstalledPlantsProps) {
  const { handleArchive } = useArchive();

  return (
    <>
      {installedPlants.map((plant) => {
        const { plantObjId, productName, imageUrlTable, location, leafDto } =
          plant;

        const imageSize = productName.startsWith('building') ? 'lg' : 'sm';
        const plantSize = leafDto && leafDto.journalCount >= 10 ? 'lg' : 'sm';

        const divStyle = imageSize === 'lg' ? 'w-[120px]' : 'w-[60px]';
        const tagStyle = isEditMode ? 'hidden' : 'block';
        const plantStyle = isEditMode ? 'opacity-60' : 'opacity-100';
        const buttonStyle = isEditMode ? 'block' : 'hidden';

        return (
          <div
            key={plantObjId}
            data-plant-id={plantObjId}
            className={`absolute flex flex-col items-center cursor-pointer ${divStyle}`}
            style={{
              top: `${location.y * 60}px`,
              left: `${location.x * 60}px`,
            }}>
            {leafDto && (
              <LeafTag
                name={leafDto.name}
                className={`-mt-12 mb-4 ${tagStyle}`}
              />
            )}
            <Plant
              name={productName}
              imageUrl={imageUrlTable[plantSize]}
              data-plant-id={plantObjId}
              className={`${plantStyle}`}
            />
            <button
              type="button"
              onClick={handleArchive}
              className={`px-2 py-[6px] border-2 border-brown-40 rounded-2xl bg-contain bg-repeat bg-[url('/assets/img/bg_wood_light.png')] text-brown-40 font-bold text-xs leading-3 shadow-outer/down ${buttonStyle}`}>
              보관
            </button>
          </div>
        );
      })}
    </>
  );
}
