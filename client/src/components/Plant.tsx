import Image from 'next/image';
import { DefaultProps, PlantInfo } from '@/types/common';
import { getPlantSize } from '@/utils/getPlantSize';

interface PlantProps extends DefaultProps {
  plantInfo: PlantInfo;
}

export default function Plant({ plantInfo, className }: PlantProps) {
  const { name, imageUrl } = plantInfo;

  const [width, height] = PLANT_IMG_SIZE[getPlantSize(name)];

  return (
    <Image
      src={imageUrl}
      alt={name}
      width={width}
      height={height}
      priority
      className={className}
    />
  );
}

const PLANT_IMG_SIZE = {
  sm: [60, 60],
  lg: [120, 120],
} as const;
