'use client';

import { twMerge } from 'tailwind-merge';

import { DefaultProps } from '@/types/common';

import { CONTROLLER_TITLES } from '@/constants/contents';
import { CONTROLLER_DIRECTIONS } from '@/constants/values';

type ControllerDirection = 'up' | 'right' | 'down' | 'left';

interface MapControllerProps extends DefaultProps {
  handleClick?: (direction: ControllerDirection) => void;
}

export default function MapController({
  handleClick,
  className,
}: MapControllerProps) {
  return (
    <section className={twMerge('absolute w-[76px] h-[76px]', className)}>
      {CONTROLLER_DIRECTIONS.map((value) => {
        return (
          <button
            key={value}
            onClick={() => handleClick && handleClick(value)}
            type="button"
            title={`${CONTROLLER_TITLES[value]}으로 이동`}
            className={`absolute  w-6 h-6 bg-contain bg-center shadow-controller ${CONTROLLER_STYLE[value]}`}
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
