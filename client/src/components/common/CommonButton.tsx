import { DefaultProps } from '@/types/common';

interface CommonButtonProps extends DefaultProps {
  usage: 'button' | 'submit';
  size: 'sm' | 'md' | 'lg' | 'fix';
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CommonButton({
  usage,
  size,
  children,
}: CommonButtonProps) {
  return (
    <button
      type={usage}
      className={`font-bold border-brown-70 rounded-lg text-brown-10 bg-center bg-repeat bg-[url('/assets/img/bg_wood_dark.svg')] shadow-outer/down ${BUTTON_STYLE[size]}`}>
      {children}
    </button>
  );
}

const BUTTON_STYLE = {
  sm: 'px-[10px] py-[6px] text-sm border-2 bg-[length:34px_34px] leading-[14px]',
  md: 'px-[13px] py-[9px] text-xl border-[3px] bg-[length:44px_44px] leading-5',
  lg: 'px-[21px] py-[11px] text-2xl border-[3px] bg-[length:52px_52px] leading-6',
  fix: 'w-[227px] h-[52px] text-2xl border-[3px] bg-[length:52px_52px]',
} as const;
