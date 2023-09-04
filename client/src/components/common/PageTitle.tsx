import { twMerge } from 'tailwind-merge';

import { DefaultProps } from '@/types/common';

interface PageTitleProps extends DefaultProps {
  text: string;
}

export default function PageTitle({ text, className }: PageTitleProps) {
  return (
    <h2
      className={twMerge(
        "inline-block mx-auto px-[1.0625rem] py-[0.5625rem] bg-[url('/assets/img/bg_wood_dark.png')] bg-contain bg-repeat border-[3px] border-brown-70 rounded-lg text-center text-[1.75rem] font-bold text-brown-10",
        className,
      )}>
      {text}
    </h2>
  );
}
