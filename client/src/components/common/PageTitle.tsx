import { twMerge } from 'tailwind-merge';

import { DefaultProps } from '@/types/common';

interface PageTitleProps extends DefaultProps {
  text: string;
}

export default function PageTitle({ text, className }: PageTitleProps) {
  return (
    <h2
      className={twMerge(
        "inline-block w-fit mx-auto px-4 py-[6px] bg-[url('/assets/img/bg_wood_dark.png')] bg-contain bg-repeat border-[3px] border-brown-70 rounded-lg text-center text-2xl font-bold text-brown-10 break-keep common-drop-shadow",
        className,
      )}>
      {text}
    </h2>
  );
}
