'use client';

import useHistoryStore from '@/stores/historyStore';
import useUserStore from '@/stores/userStore';

import useClient from '@/hooks/useClient';

import UserButton from './UserButton';
import UserInfo from './UserInfo';
import Dropdown from './Dropdown';
import HistoryBoard from './HistoryBoard';
import HistoryLikes from './HistoryLikes';
import HistoryComment from './HistoryComment';

interface HistoryProps {
  paramsId: string;
}

export default function HistoryBox({ paramsId }: HistoryProps) {
  const isClient = useClient();

  const id = paramsId;
  const userId = useUserStore((state) => state.userId);

  const selectOption = useHistoryStore((state) => state.selectOption);

  const isOwner = userId === id;

  const isBoardWritten = selectOption === 'boardWritten';
  const isBoardLike = selectOption === 'boardLiked';
  const isComment = selectOption === 'commentWritten';

  return (
    <>
      {isClient && (
        <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-full min-w-[312px] max-w-[715px] h-full max-[360px]:h-[633px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
          <div className="w-full flex justify-end gap-3 mt-6 mr-7 mb-4 max-[360px]:flex max-[360px]:justify-center max-[360px]:items-center max-[360px]:mr-0">
            {isOwner && <UserButton />}
          </div>

          <div className="mb-5 min-[360px]:flex justify-center items-center ml-2">
            <UserInfo paramsId={paramsId} />
          </div>

          {isOwner && (
            <div className="w-[92%] max-[360px]:w-[50%]">
              <Dropdown />
            </div>
          )}

          {(userId || paramsId) && (
            <div className="flex flex-col items-start overflow-hidden">
              <div className="w-[650px] mt-3 overflow-x-hidden overflow-y-scroll scrollbar">
                {isBoardWritten && <HistoryBoard paramsId={id} />}
                {isOwner && isBoardLike && <HistoryLikes paramsId={id} />}
                {isOwner && isComment && <HistoryComment paramsId={id} />}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
