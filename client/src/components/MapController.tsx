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
    <section>
      {CONTROLLER_DIRECTIONS.map((value) => {
        const controllerBg = `bg-[url('/assets/img/button_controller_${value}.png')]`;

        return (
          <button
            onClick={() => handleClick && handleClick(value)}
            type="button"
            title={`${CONTROLLER_TITLES[value]}으로 이동`}
            className={`w-6 h-6 ${controllerBg} shadow-controller`}
          />
        );
      })}
    </section>
  );
}
