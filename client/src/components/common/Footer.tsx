'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import FooterLink from './FooterLink';

import { FOOTER_LINK } from '@/constants/contents';

export default function Footer() {
  const router = useRouter();

  return (
    <footer
      className="h-[189px] flex flex-col justify-center items-center bg-brown-90 border-t-[8px] 
    border-border-10">
      <Image
        src="/assets/img/footer_github.png"
        width={32}
        height={32}
        alt="github_logo"
        className="w-8 h-8 mt-7 mb-6"
        onClick={() => router.push(FOOTER_LINK.team)}
      />

      <div className="flex justify-center items-center">
        <span className="flex justify-center items-center text-[8px] text-brown-20 leading-[8px] font-bold px-[6px] h-4 border-[1px] border-brown-70 rounded bg-cover bg-center bg-no-repeat bg-[url('/assets/img/bg_wood_dark.png')] mr-2">
          FE
        </span>
        <ul className="flex text-[10px] text-center text-brown-20 leading-[10px] font-bold">
          <FooterLink repositories="minseok" member="@nalsae" />
          &nbsp;
          <FooterLink repositories="doyeon" member="@shimdokite" />
          &nbsp;
          <FooterLink repositories="hanbin" member="@hanbinchoi" />
        </ul>
      </div>

      <div className="flex justify-center items-center mt-[14px] mb-[31px]">
        <span className="flex justify-center items-center text-[8px] text-brown-20 leading-[8px] font-bold px-[6px] h-4 border-[1px] border-brown-70 rounded bg-cover bg-center bg-no-repeat bg-[url('/assets/img/bg_wood_dark.png')] mr-2">
          BE
        </span>
        <ul className="flex text-[10px] text-center text-brown-20 leading-[10px] font-bold">
          <FooterLink repositories="dogyeong" member="@Smile:DK" />
          &nbsp;
          <FooterLink repositories="dohyeong" member="@dohyoungK" />
          &nbsp;
          <FooterLink repositories="seungtae" member="@NtoZero" />
        </ul>
      </div>

      <p className="text-xs text-center text-brown-40 leading-3 font-bold mb-7">
        © 2023. Grow Story all rights reserved.
      </p>
    </footer>
  );
}
