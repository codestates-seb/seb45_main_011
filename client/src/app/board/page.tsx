'use client';

import BoardBanner from '@/components/board/BoardBanner';
import BoardSearchForm from '@/components/board/BoardSearchForm';

import RankBoard from '@/components/board/RankBoard';

export default function Board() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <RankBoard />
      <BoardBanner />
      <div className="relative w-full max-w-[720px] h-[487px] border-gradient">
        <div className="p-4 flex flex-col gap-5">
          <BoardSearchForm />
          <div className="pr-3 w-full h-[404px] flex flex-wrap  gap-4 overflow-y-scroll scrollbar"></div>
        </div>
      </div>
    </div>
  );
}
