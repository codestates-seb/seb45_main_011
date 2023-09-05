import Image from 'next/image';

import { MoveTarget } from '@/stores/gardenStore';

interface TrackedPlantProps {
  targetX: number;
  targetY: number;
  moveTarget: MoveTarget;
}

export default function TrackedPlant({
  targetX,
  targetY,
  moveTarget,
}: TrackedPlantProps) {
  const { productName, imageUrlTable, plantSize, imageSize } = moveTarget;

  return (
    <Image
      src={imageUrlTable[plantSize]}
      alt={productName}
      width={TARGETPLANT_SIZE[imageSize]}
      height={TARGETPLANT_SIZE[imageSize]}
      className="absolute"
      style={{
        transform: `translate(${targetX - 140}px, ${targetY - 160}px)`,
      }}
    />
  );
}

const TARGETPLANT_SIZE = {
  sm: 60,
  lg: 120,
} as const;
