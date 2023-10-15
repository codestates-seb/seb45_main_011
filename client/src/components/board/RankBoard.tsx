'use client';

import Link from 'next/link';
import Image from 'next/image';

import { motion } from 'framer-motion';

import useBoardStore from '@/stores/boardStore';

import { MOUNT_ANIMATION_VALUES } from '@/constants/values';

const renderMedal = (rank: number) => {
  if (rank === 1)
    return (
      <Image
        src="/assets/img/gold.svg"
        alt={'1등'}
        width={20}
        height={28}
        className="max-[604px]:w-4"
      />
    );
  if (rank === 2)
    return (
      <Image
        src="/assets/img/silver.svg"
        alt="2등"
        width={20}
        height={28}
        className="max-[604px]:w-4"
      />
    );
  if (rank === 3)
    return (
      <Image
        src="/assets/img/bronze.svg"
        alt="3등"
        width={20}
        height={28}
        className="max-[604px]:w-4"
      />
    );
};

export default function RankBoard() {
  const { boardRank } = useBoardStore();

  return (
    <motion.div
      variants={MOUNT_ANIMATION_VALUES}
      initial="initial"
      animate="animate"
      className="pt-[60px] w-[448px] h-[268px] flex flex-col items-center bg-contain bg-center bg-no-repeat bg-[url('/assets/img/bg_board_lg.png')] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] scale-100 max-[604px]:w-[313px] max-[604px]:-mb-3 max-[604px]:px-6 max-[604px]:pt-[78px]">
      <h2 className="text-2xl leading-6 text-brown-10 font-bold max-[604px]:text-xl">
        이주의 좋아요 순위
      </h2>
      <div className="py-5 w-full max-w-[720px] flex flex-col items-center gap-2 text-base leading-4 text-brown-10 font-normal whitespace-nowrap overflow-x-hidden max-[604px]:text-xs max-[604px]:gap-1 max-[604px]:pt-1">
        {boardRank.map((board) => {
          return (
            <Link
              href={`/post/${board.boardId}`}
              className="w-full h-fit max-w-[360px] overflow-hidden px-2">
              <div className="h-[24px] flex gap-3 items-center max-[604px]:gap-2 hover:scale-105 hover:transition-transform hover:text-yellow-30">
                {renderMedal(board.rank)}
                <p className="whitespace-nowrap text-ellipsis overflow-hidden break-words">
                  {`${board.displayName} 님의 ${board.title}`}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
