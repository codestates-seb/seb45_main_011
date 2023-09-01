'use client';

import { DefaultProps } from '@/types/common';
import { CONTROLLER_TITLES } from '@/constants/contents';
import { CONTROLLER_DIRECTIONS } from '@/constants/values';

type ControllerDirection = 'up' | 'right' | 'down' | 'left';

interface MapControllerProps extends DefaultProps {
  handleClick?: (direction: ControllerDirection) => void;
}

export default function MapController({ handleClick }: MapControllerProps) {
  return (
    <section className="relative w-[76px] h-[76px]">
      {CONTROLLER_DIRECTIONS.map((value) => {
        const controllerBg = `bg-[url('/assets/img/button_controller_${value}.png')]`;

        return (
          <button
            key={value}
            onClick={() => handleClick && handleClick(value)}
            type="button"
            title={`${CONTROLLER_TITLES[value]}으로 이동`}
            className={`absolute ${CONTROLLER_POSITION[value]} w-6 h-6 bg-contain bg-center ${controllerBg} shadow-controller`}
          />
        );
      })}
    </section>
  );
}

const CONTROLLER_POSITION = {
  up: `top-0 left-[26px]`,
  right: `top-[26px] right-0`,
  down: `bottom-0 left-[26px]`,
  left: `top-[26px] left-0`,
} as const;
