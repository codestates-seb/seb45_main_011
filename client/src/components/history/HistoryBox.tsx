'use client';

import useHistoryStore from '@/stores/historyStore';
import useUserStore from '@/stores/userStore';

import useClient from '@/hooks/useClient';

import {
  UserButton,
  UserInfo,
  Dropdown,
  HistoryBoard,
  HistoryLikes,
  HistoryComment,
} from '.';

import { ADMIN_USER_ID } from '@/constants/values';

interface HistoryProps {
  paramsId: string;
}

export default function HistoryBox({ paramsId }: HistoryProps) {
  const { userId } = useUserStore();
  const { selectOption } = useHistoryStore();

  const isClient = useClient();

  const id = paramsId;
  const isOwner = userId === id;

  const IS_BOARD_WRITTEN = selectOption === 'boardWritten';
  const IS_BOARD_LIKE = selectOption === 'boardLiked';
  const IS_COMMENT = selectOption === 'commentWritten';

  return (
    <>
      {isClient && (
        <section className="relative bg-[url('/assets/img/bg_wood_yellow.png')] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient mb-[60px]">
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
                {IS_BOARD_WRITTEN && <HistoryBoard paramsId={id} />}
                {isOwner && IS_BOARD_LIKE && <HistoryLikes paramsId={id} />}
                {isOwner && IS_COMMENT && <HistoryComment paramsId={id} />}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
