'use client';

import useHistoryStore from '@/stores/historyStore';

import useClient from '@/hooks/useClient';

import UserInfo from './UserInfo';
import HistoryBoard from './HistoryBoard';
import Dropdown from './Dropdown';
import HistoryLikes from './HistoryLikes';
import HistoryComment from './HistoryComment';
import UserButton from './UserButton';

interface HistoryProps {
  paramsId: string;
}

export default function HistoryBox({ paramsId }: HistoryProps) {
  const isClient = useClient();

  const id = paramsId;
  // const userId = useUserStore((state) => state.userId);
  const userId = '1';

  const selectOption = useHistoryStore((state) => state.selectOption);

  const isMeLogin = userId && paramsId;
  const isMeAccount = userId === paramsId;

  const isBoardWritten = selectOption === 'boardWritten';
  const isBoardLike = selectOption === 'boardLiked';
  const isComment = selectOption === 'commentWritten';

  return (
    <>
      {isClient && (
        <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-[720px] h-[635px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
          <div className="w-full flex justify-end gap-3 mt-6 mr-6 mb-4">
            {isMeAccount && <UserButton />}
          </div>

          <div className="mb-5">
            <UserInfo paramsId={paramsId} />
          </div>

          {isMeAccount && (
            <div className="w-[92%]">
              <Dropdown />
            </div>
          )}

          {(userId || paramsId) && (
            <div className="flex flex-col items-start overflow-hidden">
              <div className="w-[650px] mt-3 overflow-x-hidden overflow-y-scroll scrollbar">
                {isBoardWritten && <HistoryBoard paramsId={id} />}
                {isMeLogin && isBoardLike && <HistoryLikes paramsId={id} />}
                {isMeLogin && isComment && <HistoryComment paramsId={id} />}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
