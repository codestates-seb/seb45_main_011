import { MouseEventHandler } from 'react';

interface PaginationProps {
  page: number;
  onFirstPage: MouseEventHandler<HTMLDivElement>;
  onLastPage: MouseEventHandler<HTMLDivElement>;
  onPreviousPage: MouseEventHandler<HTMLButtonElement>;
  onNextPage: MouseEventHandler<HTMLButtonElement>;
}

export default function Pagination({
  page,
  onFirstPage,
  onLastPage,
  onPreviousPage,
  onNextPage,
}: PaginationProps) {
  return (
    <div className="relative pt-2 flex justify-center items-center mb-3">
      <div className="flex justify-center items-center" onClick={onFirstPage}>
        <button className="border-brown-70 after:absolute top-0 content-none w-[12px] h-[12px] border-t-[3px] border-r-[3px] rotate-[225deg]"></button>
        <button className="-m-1 border-brown-70 after:absolute top-0 content-none w-[12px] h-[12px] border-t-[3px] border-r-[3px] rotate-[225deg]"></button>
      </div>

      <button
        className="ml-3 border-brown-50 after:absolute top-0 left-0 content-none w-[12px] h-[12px] border-t-[3px] border-r-[3px] rotate-[225deg]"
        onClick={onPreviousPage}></button>

      <p className="flex justify-center items-center w-[10px] px-4 text-brown-70 text-[20px] font-bold">
        {page}
      </p>

      <button
        className="mr-3 border-brown-50 after:absolute top-0 left-0 content-none w-[12px] h-[12px] border-t-[3px] border-r-[3px] rotate-[45deg]"
        onClick={onNextPage}></button>

      <div className="flex justify-center items-center" onClick={onLastPage}>
        <button className="border-brown-70 after:absolute top-0 content-none w-[12px] h-[12px] border-t-[3px] border-r-[3px] rotate-[45deg]"></button>
        <button className="-m-1 border-brown-70 after:absolute top-0 content-none w-[12px] h-[12px] border-t-[3px] border-r-[3px] rotate-[45deg]"></button>
      </div>
    </div>
  );
}
