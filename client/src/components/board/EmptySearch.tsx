import { EMPTY_SEARCH_TEXT } from '@/constants/contents';

export default function EmptySearch() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full py-10 px-3 flex flex-col gap-[1.1rem] justify-center items-center max-w-[414px] bg-brown-10 border-2 border-brown-50 rounded-lg shadow-outer/down max-[380px]:w-[240px] max-[380px]:h-[164px]">
        <div className="flex flex-col gap-2 text-center">
          <p className="font-bold text-[1.25rem] text-brown-70 break-words max-[386px]:text-[1.15rem] ">
            {EMPTY_SEARCH_TEXT}
          </p>
        </div>
      </div>
    </div>
  );
}
