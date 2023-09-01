import Image from 'next/image';
import { DefaultProps } from '@/types/common';
import { getPlantSize } from '@/utils/getPlantSize';

type PlantInfo = {
  name: string;
  imageUrl: string;
  price: number;
};

interface PlantProps extends DefaultProps {
  plantInfo: PlantInfo;
}

export default function Plant({ plantInfo }: PlantProps) {
  const { name, imageUrl } = plantInfo;

  const [width, height] = PLANT_IMG_SIZE[getPlantSize(name)];

  return (
    <Image src={imageUrl} alt={name} width={width} height={height} priority />
  );
}

const PLANT_IMG_SIZE = {
  sm: [60, 60],
  lg: [120, 120],
} as const;
