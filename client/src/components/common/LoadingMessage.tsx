'use client';

import Image from 'next/image';

import { LOADING_CONTENTS } from '@/constants/contents';

export default function LoadingMessage() {
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
      <p className="w-fit h-12 px-3 py-2 border-2 border-brown-70 rounded-lg bg-contain bg-repeat bg-[url('/assets/img/bg_wood_dark.png')] text-xl font-bold text-brown-10 shadow-outer/down whitespace-nowrap overflow-hidden">
        {LOADING_CONTENTS}
      </p>
    </section>
  );
}
