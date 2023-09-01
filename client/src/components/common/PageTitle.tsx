import { DefaultProps } from '@/types/common';

interface PageTitleProps extends DefaultProps {
  text: string;
}

export default function PageTitle({ text }: PageTitleProps) {
  return (
    <div className="mx-auto px-[12px] py-[20px] bg-[url('/assets/img/bg_wood_dark.png')] bg-contain bg-repeat border-[3px] border-brown-70 rounded-lg text-center text-[1.75rem] font-bold text-brown-10 ">
      {text}
    </div>
  );
}
