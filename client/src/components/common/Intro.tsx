import { DefaultProps } from '@/types/common';
import Logo from './Logo';
import Image from 'next/image';

interface IntroProps extends DefaultProps {
  children: React.ReactNode;
}

export default function Intro({ children }: IntroProps) {
  return (
    <div className="flex justify-center items-center p-[8px] max-w-[628px]  bg-gradient-to-b from-[#EC9355] to-[#DC7737] rounded-xl">
      <div className="relative p-[52px] flex flex-col gap-[28px] items-center w-full h-full bg-[url('/assets/img/bg_wood_yellow.svg')] rounded-md">
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
          {/*
          children:  
          <p className="text-[#A54426] text-2xl font-bold">키우는 식물로</p>
            <p className="text-[#A54426] text-2xl font-bold">
              <b className="text-[#4D2113] text-[2rem]">나만의 정원</b>을 꾸며 보세요!
          </p>
         */}
        </div>
      </div>
    </div>
  );
}
