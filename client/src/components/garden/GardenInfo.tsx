'use client';

import Image from 'next/image';

import useGardenStore from '@/stores/gardenStore';

import { EditModeButton } from '@/components/garden';

interface GardenInfoProps {
  isMyself: boolean;
}

export default function GardenInfo({ isMyself }: GardenInfoProps) {
  const { point, userName } = useGardenStore();

  return (
    <section className="flex gap-2 min-w-[320px]">
      <p className="flex items-center gap-[6px] min-w-max h-fit px-3 py-2 text-lg text-brown-70 font-bold border-8 border-b-0 border-border-30 rounded-t-xl bg-contain bg-repeat bg-[url('/assets/img/bg_wood_yellow.png')] leading-6">
        {isMyself ? (
          <>
            <Image
              src="/assets/img/point.svg"
              width={24}
              height={24}
              alt="포인트"
            />
            {point.toLocaleString('ko-KR')}
          </>
        ) : (
          <>{`${userName} 님의 정원`}</>
        )}
      </p>
      {isMyself && <EditModeButton />}
    </section>
  );
}
