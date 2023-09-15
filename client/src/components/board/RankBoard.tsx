'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

export default function RankBoard() {
  return (
    <motion.div
      variants={MOUNT_ANIMATION_VALUES}
      initial="initial"
      animate="animate"
      className="py-10  w-[448px] flex flex-col items-center bg-cover bg-center bgco bg-[url('/assets/img/bg_board_lg.png')] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] scale-100 max-[604px]:scale-75 max-[604px]:-mb-5 max-[415px]:scale-[0.7] max-[415px]:-mb-7">
      <h2 className=" text-2xl leading-6 text-brown-10 font-bold">
        이주의 좋아요 순위
      </h2>
      <div className="pt-5 max-w-[720px] flex flex-col items-center gap-2 text-base leading-4 text-brown-10 font-normal whitespace-nowrap overflow-x-hidden ">
        <p className="flex gap-3 items-center">
          <Image src="/assets/img/gold.svg" alt="1등" width={20} height={28} />
          식집사 님의 첫 바질!!
        </p>
        <p className="flex gap-3 items-center">
          <Image
            src="/assets/img/silver.svg"
            alt="1등"
            width={20}
            height={28}
          />
          도마도 님의 토마토 키우기, 어렵지 않아요!
        </p>
        <p className="flex gap-3 items-center">
          <Image
            src="/assets/img/bronze.svg"
            alt="1등"
            width={20}
            height={28}
          />
          다유기 님의 다육이 성장 일기
        </p>
      </div>
    </motion.div>
  );
}
