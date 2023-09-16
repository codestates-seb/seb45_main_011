'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function MainSignupBanner() {
  return (
    <Link
      href={'/signup'}
      className="flex justify-between items-center gap-5 px-[25px] py-[21px] bg-[url('/assets/img/bg_wood_light.png')] border-[3px] border-brown-50 rounded-xl shadow-outer/down max-[500px]:px-[17px] max-[500px]:py-[14px] max-[500px]:gap-2">
      <Image
        className="max-[500px]:w-[36px]"
        src={'/assets/img/no_border_tree.svg'}
        alt=""
        width={40}
        height={40}
      />
      <p className="text-[1.8rem] leading-[1.8rem] font-bold text-brown-40 whitespace-nowrap max-[500px]:text-[1.4rem] max-[500px]:leading-[1.4rem]">
        지금 바로 <b className="text-brown-60">가입하기</b>
      </p>
      <Image
        className="max-[500px]:w-[36px]"
        src={'/assets/img/no_border_tree.svg'}
        alt=""
        width={40}
        height={40}
      />
    </Link>
  );
}
