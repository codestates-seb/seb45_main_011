import Image from 'next/image';
import { useState } from 'react';

import useEffectOnce from '@/hooks/useEffectOnce';

export default function BoardBanner() {
  const [isSmallView, setIsSmallView] = useState(false);
  useEffectOnce(() => {
    const handleResize = () => {
      if (window.innerWidth < 604) return setIsSmallView(true);

      return setIsSmallView(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div>
      <div className="py-[1.375rem] px-[1rem] w-full h-[132px] min-w-[328px] max-w-[720px] flex justify-between items-center gap-4 bg-[url('/assets/img/bg_grass.png')] bg-cover shadow-outer/down border-[6px] border-green-90 rounded-xl mb-2 max-[688px]:py-[1rem] max-[688px]:px-[1rem] max-[432px]:h-[108px]">
        <div className="w-[52px]">
          <Image
            className=" object-cover"
            src="/assets/img/trophy.svg"
            alt=""
            width={52}
            height={52}
          />
        </div>
        <div className="flex flex-col gap-3 items-center justify-between text-center max-[432px]:gap-1">
          <p className="text-2xl leading-6 text-white-10 font-bold banner-text-shadow common-drop-shadow max-[432px]:text-[1rem]">
            {isSmallView
              ? '좋아요 순위에 따라'
              : '좋아요를 많이 받은 1 ~ 3위에게'}
          </p>
          <p className=" text-[2rem] leading-10 font-bold text-white-10 banner-text-shadow common-drop-shadow max-[752px]:text-2xl max-[415px]:text-[1.175rem]">
            <b className=" text-[2.5rem] text-yellow-50 max-[760px]:text-[2rem] max-[480px]:text-[2rem] max-[432px]:text-[1.25rem]">
              {isSmallView ? '포인트' : '매주 포인트'}
            </b>
            {isSmallView ? '를 드려요!' : '를 지급해 드려요!'}
          </p>
        </div>
        <div className="w-[52px]">
          <Image
            className=" object-cover"
            src="/assets/img/trophy.svg"
            alt=""
            width={52}
            height={52}
          />
        </div>
      </div>
      {isSmallView && (
        <p className="text-center text-[0.5rem] text-gray-70">
          포인트는 매주 월요일에 지급되며, 이전 랭킹은 초기화 됩니다.
        </p>
      )}
    </div>
  );
}
