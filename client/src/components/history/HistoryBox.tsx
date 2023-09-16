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
        <div className="relative bg-[url('/assets/img/bg_wood_yellow.png')] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
          <div className="flex flex-col items-center justify-center max-w-[715px] max-h-[633px] p-4">
            <div className="w-full flex justify-end gap-3 mr-1 mb-4 max-[530px]:flex max-[530px]:justify-center max-[530px]:items-center">
              {isOwner && <UserButton />}
            </div>

            <div className="mb-5 min-[360px]:flex justify-center items-center ml-2 mt-4">
              <UserInfo paramsId={paramsId} />
            </div>

            {isOwner && (
              <div className="my-4 w-[92%] max-[360px]:w-[80%]">
                <Dropdown />
              </div>
            )}

            {(userId || paramsId) && (
              <div className="h-[404px] px-5 overflow-y-scroll scrollbar">
                {isBoardWritten && <HistoryBoard paramsId={id} />}
                {isOwner && isBoardLike && <HistoryLikes paramsId={id} />}
                {isOwner && isComment && <HistoryComment paramsId={id} />}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
