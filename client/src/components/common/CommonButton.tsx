'use client';

import { twMerge } from 'tailwind-merge';

import { DefaultProps, addPrefixToHandler } from '@/types/common';

interface CommonButtonProps
  extends addPrefixToHandler<any, 'on'>,
    DefaultProps {
  type: 'button' | 'submit';
  size: 'sm' | 'md' | 'lg' | 'fix';
  children: string;
  disabled?: boolean;
}

export default function CommonButton({
  type,
  size,
  children,
  className,
  disabled,
  ...props
}: CommonButtonProps) {
  const handleClick = Object.values(props)[0];

  return (
    <button
      onClick={handleClick}
      type={type}
      className={twMerge(
        `font-bold border-brown-70 rounded-lg text-brown-10 bg-contain bg-center bg-repeat bg-[url('/assets/img/bg_wood_dark.png')] shadow-outer/down ${BUTTON_STYLE[size]}`,
        className,
      )}
      disabled={disabled}>
      {children}
    </button>
  );
}

const BUTTON_STYLE = {
  sm: 'px-[10px] py-[6px] text-sm border-2 leading-[14px]',
  md: 'px-[13px] py-[9px] text-xl border-[3px] leading-5',
  lg: 'px-[21px] py-[11px] text-2xl border-[3px] leading-6',
  fix: 'w-[227px] h-[52px] text-2xl border-[3px]',
} as const;
