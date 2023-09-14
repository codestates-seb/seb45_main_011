'use client';

import { Collapse } from '@material-tailwind/react';

import useHistoryStore from '@/stores/historyStore';

import useDetectClose from '@/hooks/useDetectClose';

import { DROPDOWN_OPTIONS } from '@/constants/contents';

export default function Dropdown() {
  const { selectOption, setSelectOption } = useHistoryStore();
  const { setIsOpen, isOpen, ref } = useDetectClose(false);

  return (
    <div className="absolute">
      <div className="relative bottom-8">
        <div
          className="flex items-center w-[168px] h-[36px] rounded-lg border-2 border-brown-70 bg-white-10 shadow-outer/down cursor-pointer"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          ref={ref}>
          <div className="w-full flex justify-between px-2">
            <div className="flex justify-start">
              {DROPDOWN_OPTIONS.map((list, index) => (
                <p className="text-xs text-brown-80" key={index}>
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
        <Collapse open={isOpen}>
          {isOpen && (
            <div className="flex flex-col w-[168px] h-[92px] mt-1 rounded-lg border-2 border-brown-70 bg-white-10 shadow-outer/down cursor-pointer">
              <div className="flex flex-col justify-center w-full h-full">
                <div
                  className="border-b border-dotted border-brown-50"
                  onClick={() => setSelectOption('boardWritten')}>
                  <p className="text-xs text-brown-80 pl-2 py-[6px]">
                    작성한 게시글
                  </p>
                </div>
                <div
                  className=" border-b border-dotted border-brown-50"
                  onClick={() => setSelectOption('boardLiked')}>
                  <p className="text-xs text-brown-80 pl-2 py-[6px]">
                    좋아요를 누른 게시글
                  </p>
                </div>
                <div onClick={() => setSelectOption('commentWritten')}>
                  <p className="text-xs text-brown-80 pl-2 py-[6px]">
                    댓글을 작성한 게시글
                  </p>
                </div>
              </div>
            </div>
          )}
        </Collapse>
      </div>
    </div>
  );
}
