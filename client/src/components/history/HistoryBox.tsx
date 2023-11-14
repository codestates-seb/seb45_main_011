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

import { ADMIN_USER_ID } from '@/constants/values';

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
        <div className="relative bg-[url('/assets/img/bg_wood_yellow.png')] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient mb-[60px]">
          <div className="flex flex-col items-center justify-center mb-2 max-[730px]:w-[512px] max-[530px]:w-[412px] max-[430px]:w-[312px] min-w-[312px] max-w-[715px] max-h-[650px] p-4 pt-9">
            {userId !== ADMIN_USER_ID && (
              <div className="w-full flex justify-end gap-3 mr-1 mb-4 max-[530px]:flex max-[530px]:justify-center max-[530px]:items-center">
                {isOwner && <UserButton />}
              </div>
            )}

            <div className="mb-5 min-[580px]:flex justify-center items-center ml-2 mt-4">
              <UserInfo paramsId={paramsId} />
            </div>

            {isOwner && (
              <div className="z-30 my-4 w-[91%] max-[360px]:w-[80%]">
                <Dropdown />
              </div>
            )}

            {(userId || paramsId) && (
              <div className="h-full min-h-[200px] pt-1 px-2 overflow-y-scroll overflow-x-hidden scrollbar">
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
