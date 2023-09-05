import Image from 'next/image';

import { DefaultProps } from '@/types/common';

interface PlantProps extends DefaultProps {
  name: string;
  imageUrl: string;
  style?: React.CSSProperties;
}

export default function Plant({
  name,
  imageUrl,
  style,
  className,
  ...props
}: PlantProps) {
  const size = name.startsWith('building') ? 'lg' : 'sm';

  const [width, height] = PLANT_IMG_SIZE[size];

  return (
    <Image
      src={imageUrl}
      alt={name}
      width={width}
      height={height}
      priority
      className={className}
      style={style}
      {...props}
    />
  );
}

const PLANT_IMG_SIZE = {
  sm: [60, 60],
  lg: [120, 120],
} as const;
