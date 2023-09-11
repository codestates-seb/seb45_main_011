'use client';

import Image from 'next/image';

import useTyping from '@/hooks/useTyping';

import { LOADING_CONTENTS } from '@/constants/contents';

export default function Loading() {
  const contents = LOADING_CONTENTS;

  const { paragraphRef } = useTyping(contents);

  return (
    <section
      aria-live="assertive"
      className="flex flex-col items-center gap-4 w-fit">
      <Image
        src="/assets/img/loading.png"
        alt=""
        width={70}
        height={70}
        className="drop-shadow-lg sizeUpAndDown"
      />
      <p
        ref={paragraphRef}
        aria-hidden={true}
        className="w-[136px] h-[60px] px-4 py-3 border-2 border-brown-70 rounded-lg bg-contain bg-repeat bg-[url('/assets/img/bg_wood_dark.png')] text-2xl font-bold text-brown-10 shadow-outer/down whitespace-nowrap overflow-hidden"
      />
    </section>
  );
}
