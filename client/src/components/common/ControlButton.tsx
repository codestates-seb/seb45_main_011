import { twMerge } from 'tailwind-merge';

import { DefaultProps, addPrefixToHandler } from '@/types/common';

import { CONTROL_BUTTON_TITLES } from '@/constants/contents';

interface ControlButtonProps
  extends addPrefixToHandler<any, 'handle'>,
    DefaultProps {
  usage: 'edit' | 'delete' | 'notificationDelete';
}

export default function ControlButton({
  usage,
  className,
  ...props
}: ControlButtonProps) {
  const handleClick = Object.values(props)[0];

  if (usage === 'notificationDelete') {
    return (
      <button
        onClick={handleClick}
        type="button"
        title={CONTROL_BUTTON_TITLES[usage]}
        className={twMerge(
          `w-[15px] h-[15px] border-2 border-brown-70 rounded-full bg-no-repeat bg-center shadow-inner/top bg-red-50
          absolute top-[3px] right-[3px] flex justify-center items-center`,
          className,
        )}>
        <img src="/assets/icon/delete.svg" alt="" className="w-[7px] h-[7px]" />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      title={CONTROL_BUTTON_TITLES[usage]}
      className={twMerge(
        `w-6 h-6 border-2 border-brown-70 rounded-full bg-no-repeat bg-center shadow-inner/top ${BUTTON_STYLE[usage]}`,
        className,
      )}
    />
  );
}

const BUTTON_STYLE = {
  edit: `bg-yellow-50 bg-[url('/assets/icon/edit.svg')]`,
  delete: `bg-red-50 bg-[url('/assets/icon/delete.svg')]`,
} as const;
