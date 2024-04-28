'use client';

import useModalStore from '@/stores/modalStore';
import useChatStore from '@/stores/chatStore';
import useUserStore from '@/stores/userStore';

import usePagination from '@/hooks/usePagination';
import useInquiryListPaginationQuery from '@/hooks/query/useInquiryListPaginationQuery';

import { Pagination } from '.';
import { ErrorMessage, LoadingMessage } from '../common';

import { REPORT_TITLE, REPORT_TITLE_STYLE } from '@/constants/contents';

import { ChatList } from '@/types/data';

export default function InquiryTable() {
  const { open, changeType } = useModalStore();
  const { setRoomId, setTitle } = useChatStore();
  const { userId } = useUserStore();

  const { chatList, pageInfo, page, setPage, isLoading, isError, isSuccess } =
    useInquiryListPaginationQuery(userId);

  const totalElements = pageInfo?.totalElements;

  const { onFirstPage, onLastPage, onNextPage, onPreviousPage } = usePagination(
    { page, setPage, totalElements },
  );

  const renderChatModal = (
    current: { key: string },
    chatRoomId: number,
    title: string,
  ) => {
    if (current.key === 'entry')
      return (
        setRoomId(`${chatRoomId}`),
        setTitle(title),
        changeType('ChatModal'),
        open()
      );
  };

  return (
    <section className='mb-4 flex flex-col justify-center items-center h-[570px] bg-brown-20 rounded-lg border-2 border-brown-50 shadow-outer/down w-[70%] px-5"'>
      <div className="flex flex-col justify-start items-center w-[95%] h-[90%]">
        <div className="w-[150px] flex justify-center items-center mt-6 mb-5 px-3 py-2 rounded-lg border-2 border-brown-70 bg-contain bg-center bg-repeat bg-[url('/assets/img/bg_wood_dark.png')] shadow-outer/down">
          <h1 className="text-brown-10 text-[24px] font-bold">문의 목록</h1>
        </div>

        <table className="w-full rounded-tl-[5px] rounded-tr-[5px] overflow-hidden">
          <thead>
            <tr>
              {[
                '번호',
                '문의일',
                '문의 제목',
                '닉네임',
                '답장 여부',
                '채팅 입장',
              ].map((current, index) => (
                <th
                  key={index}
                  style={{ width: `${REPORT_TITLE_STYLE[index]}` }}
                  className={`py-3 bg-brown-70 border-t-brown-90 border-t-[1px] border-r-[1px] border-brown-50 border-l-[1px] first:border-l-brown-90 last:border-r-brown-90 text-[20px] font-bold text-brown-10`}>
                  {current}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white-10">
            {isSuccess &&
              chatList.map((list: ChatList) => (
                <tr
                  key={list.chatRoomId}
                  className="border-b-[1px] border-brown-90">
                  {REPORT_TITLE.map((current, index) => (
                    <td
                      key={current.key + index}
                      style={{ width: `${REPORT_TITLE_STYLE[index]}` }}
                      className={`px-1 py-2 first:border-l-[1px] first:border-l-brown-90 last:border-r-brown-90 border-r-[1px] border-brown-30 text-center text-sm truncate ${
                        current.key === 'entry' && 'cursor-pointer'
                      }`}
                      onClick={() =>
                        renderChatModal(current, list.chatRoomId, list.roomName)
                      }>
                      {current.key === 'entry'
                        ? '입장하기'
                        : `${list[current.key as keyof ChatList]}`}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>

        {isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <LoadingMessage />
          </div>
        )}

        {isError && (
          <div className="w-full h-full flex justify-center items-center">
            <ErrorMessage />
          </div>
        )}
      </div>

      <Pagination
        page={page + 1}
        onFirstPage={onFirstPage}
        onLastPage={onLastPage}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </section>
  );
}
