import Image from 'next/image';

import { ProcessedPlant } from '@/stores/gardenStore';

export interface TargetPlant extends ProcessedPlant {
  imageUrl: string;
  imageSize: 'sm' | 'lg';
}

interface TrackedPlantProps {
  targetX: number;
  targetY: number;
  targetPlant: TargetPlant;
}

export default function TrackedPlant({
  targetX,
  targetY,
  targetPlant,
}: TrackedPlantProps) {
  const { imageUrl, productName, imageSize } = targetPlant;

  return (
    <Image
      src={imageUrl}
      alt={productName}
      width={TARGETPLANT_SIZE[imageSize]}
      height={TARGETPLANT_SIZE[imageSize]}
      className="absolute"
      style={{
        transform: `translate(${targetX - 10}px, ${targetY - 110}px)`,
      }}
    />
  );
}

const TARGETPLANT_SIZE = {
  sm: 60,
  lg: 120,
} as const;
