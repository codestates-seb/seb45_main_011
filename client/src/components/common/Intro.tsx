import { DefaultProps } from '@/types/common';
import Logo from './Logo';
import Image from 'next/image';

interface IntroProps extends DefaultProps {
  children: React.ReactNode;
}

export default function Intro({ children }: IntroProps) {
  return (
    <div className="relative flex flex-col gap-[28px] justify-center items-center max-w-[626px] h-[392px] rounded-md border-gradient ">
      <Image
        className="absolute top-2 left-2"
        src="assets/img/screw.svg"
        alt=""
        width={16}
        height={16}
      />
      <Image
        className="absolute top-2 right-2"
        src="assets/img/screw.svg"
        alt=""
        width={16}
        height={16}
      />
      <Image
        className="absolute bottom-2 left-2"
        src="assets/img/screw.svg"
        alt=""
        width={16}
        height={16}
      />
      <Image
        className="absolute bottom-2 right-2"
        src="assets/img/screw.svg"
        alt=""
        width={16}
        height={16}
      />
      <Logo size="large" />
      <div className="flex flex-col gap-[12px] text-center">
        {children}
        {/* children:
        <p className="text-[#A54426] text-2xl font-bold">{INTRO_DESC.first}</p>
        <p className="text-[#A54426] text-2xl font-bold">
          <b className="text-[#4D2113] text-[2rem]">{INTRO_DESC.bold}</b>
          {INTRO_DESC.second}
        </p> */}
      </div>
    </div>
  );
}
