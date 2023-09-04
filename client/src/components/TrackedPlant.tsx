import Image from 'next/image';

import { TargetPlant } from '@/stores/gardenStore';

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
  const { productName, imageUrlTable, plantSize, imageSize } = targetPlant;

  return (
    <Image
      src={imageUrlTable[plantSize]}
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
