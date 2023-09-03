import Plant from './Plant';

import { ProcessedPlant } from '@/stores/gardenStore';
import { getPlantOpacity } from '@/utils/getPlantOpacity';

interface InstalledPlantsProps {
  isEditMode: boolean;
  installedPlants: ProcessedPlant[];
}

export default function InstalledPlants({
  isEditMode,
  installedPlants,
}: InstalledPlantsProps) {
  return (
    <>
      {installedPlants.map((plant) => {
        const { plantObjId, productName, location, leafDto, isClicked } = plant;

        const plantSize = leafDto && leafDto.journalCount >= 10 ? 'lg' : 'sm';
        const imageUrl = `${process.env.NEXT_PUBLIC_PRODUCTS_IMAGE_URL}${productName}_${plantSize}.svg`;
        const plantOpacity = getPlantOpacity(isEditMode, isClicked);

        return (
          <Plant
            key={plantObjId}
            name={productName}
            imageUrl={imageUrl}
            data-plant-id={plantObjId}
            className={`absolute cursor-pointer ${plantOpacity}`}
            style={{
              top: `${location.y * 60}px`,
              left: `${location.x * 60}px`,
            }}
          />
        );
      })}
    </>
  );
}
