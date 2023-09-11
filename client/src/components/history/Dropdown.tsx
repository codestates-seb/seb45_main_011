'use client';

import { useState } from 'react';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectOption, setSelectOption] = useState('all');

  const options = [
    {
      title: 'all',
      selected: '게시글 보기',
    },
    {
      title: 'written',
      selected: '작성한 게시글',
    },
    {
      title: 'like',
      selected: '좋아요를 누른 게시글',
    },
    {
      title: 'comment',
      selected: '댓글을 작성한 게시글',
    },
  ];

  const DROPDOWN_TEXT_COLOR = () => {
    if (selectOption === 'all') {
      return 'text-gray-50';
    }

    return 'text-brown-80';
  };

  return (
    <>
      <div
        className="flex items-center w-[168px] h-[36px] rounded-lg border-2 border-brown-70 bg-white-10 shadow-outer/down cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="w-full flex justify-between px-2">
          <div className="flex justify-start">
            {options.map((list, index) => (
              <p className={`text-xs ${DROPDOWN_TEXT_COLOR()}`} key={index}>
                {selectOption === list.title && list.selected}
              </p>
            ))}
          </div>
          {isOpen ? (
            <img src="/assets/icon/up.svg" />
          ) : (
            <img src="/assets/icon/down.svg" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col w-[168px] h-[92px] mt-1 rounded-lg border-2 border-brown-70 bg-white-10 shadow-outer/down cursor-pointer">
          <div className="flex flex-col justify-center w-full h-full">
            <div
              className="border-b border-dotted border-brown-50"
              onClick={() => setSelectOption('written')}>
              <p className="text-xs text-brown-80 pl-2 py-[6px]">
                작성한 게시글
              </p>
            </div>
            <div
              className=" border-b border-dotted border-brown-50"
              onClick={() => setSelectOption('like')}>
              <p className="text-xs text-brown-80 pl-2 py-[6px]">
                좋아요를 누른 게시글
              </p>
            </div>
            <div onClick={() => setSelectOption('comment')}>
              <p className="text-xs text-brown-80 pl-2 py-[6px]">
                댓글을 작성한 게시글
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
