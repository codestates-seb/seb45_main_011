'use client';

import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import { DefaultProps } from '@/types/common';

import { CONTROLLER_TITLES } from '@/constants/contents';
import { CONTROLLER_DIRECTIONS } from '@/constants/values';

type ControllerDirection = 'up' | 'right' | 'down' | 'left';

interface MapControllerProps extends DefaultProps {
  gardenMap: HTMLElement | null;
}

export default function MapController({
  gardenMap,
  className,
}: MapControllerProps) {
  const handleClick = (direction: ControllerDirection) => {
    if (!gardenMap) return;

    const scrollTop = gardenMap.scrollTop;
    const scrollLeft = gardenMap.scrollLeft;

    if (direction === 'up')
      gardenMap.scroll({ top: scrollTop - 100, behavior: 'smooth' });
    if (direction === 'right')
      gardenMap.scroll({ left: scrollLeft + 100, behavior: 'smooth' });
    if (direction === 'down')
      gardenMap.scroll({ top: scrollTop + 100, behavior: 'smooth' });
    if (direction === 'left')
      gardenMap.scroll({ left: scrollLeft - 100, behavior: 'smooth' });
  };

  return (
    <section className={twMerge('absolute w-[76px] h-[76px]', className)}>
      {CONTROLLER_DIRECTIONS.map((direction) => {
        return (
          <motion.button
            key={direction}
            onClick={() => handleClick(direction)}
            type="button"
            title={`${CONTROLLER_TITLES[direction]}으로 이동`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute w-6 h-6 bg-contain bg-center shadow-controller ${CONTROLLER_STYLE[direction]}`}
          />
        );
      })}
    </section>
  );
}

const CONTROLLER_STYLE = {
  up: `top-0 left-[26px] bg-[url('/assets/img/button_controller_up.png')]`,
  right: `top-[26px] right-0 bg-[url('/assets/img/button_controller_right.png')]`,
  down: `bottom-0 left-[26px] bg-[url('/assets/img/button_controller_down.png')]`,
  left: `top-[26px] left-0 bg-[url('/assets/img/button_controller_left.png')]`,
} as const;
