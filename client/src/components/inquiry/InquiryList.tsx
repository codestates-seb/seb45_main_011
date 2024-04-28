'use client';

import { useEffect, useRef } from 'react';

import useUserStore from '@/stores/userStore';
import useChatStore from '@/stores/chatStore';

import useChatListQuery from '@/hooks/query/useChatListQuery';

import { InquiryForm, InquiryRoom } from '.';
import { ErrorMessage, LoadingMessage } from '../common';

import { ChatList } from '@/types/data';

export default function InquiryList() {
  const ref = useRef(null);

  const { userId } = useUserStore();
  const { selected } = useChatStore();

  const {
    data: chatList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useChatListQuery(userId);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.05,
  };

  let observer: IntersectionObserver;

  const intersector: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
  ) => {
    const [entry] = entries;
    entry.isIntersecting && fetchNextPage();
  };

  useEffect(() => {
    if (ref && ref.current) {
      observer = new IntersectionObserver(intersector, options);
      observer.observe(ref.current);
    }

    return () => {
      observer && observer.disconnect();
    };
  }, [ref, hasNextPage]);

  return (
    <>
      {selected === 'chat' && <InquiryForm />}

      <div className="flex flex-col items-center w-full h-[83%]">
        <div className="w-[86px] h-[30px] rounded-lg border-2 border-brown-70 mb-2 py-2 px-2 flex justify-center items-center bg-contain bg-center bg-repeat bg-[url('/assets/img/bg_wood_dark.png')]">
          <p className="text-brown-10 text-[14px] font-bold">대화 목록</p>
        </div>

        {isError && !chatList && (
          <div className="h-full flex justify-center items-center">
            <p>아직 대화가 없습니다.</p>
          </div>
        )}

        <div className="w-full h-[82%] overflow-y-scroll scrollbar">
          {chatList?.map((page) => {
            return page.chatList.map((list: ChatList) => (
              <div key={list.chatRoomId}>
                {page.chatList.length === 0 ? (
                  <div className="h-full flex justify-center items-center">
                    <p>아직 대화가 없습니다.</p>
                  </div>
                ) : (
                  <InquiryRoom chatList={list} key={list.chatRoomId} />
                )}
              </div>
            ));
          })}
          <div ref={ref}></div>

          {isLoading && (
            <div className="w-full h-full flex justify-center items-center pl-2">
              <LoadingMessage />
            </div>
          )}

          {isError && chatList && (
            <div className="w-full h-full flex justify-center items-center pl-2">
              <ErrorMessage />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
