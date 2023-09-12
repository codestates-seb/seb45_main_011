import { UseFormRegister } from 'react-hook-form';

import { SearchValues } from '@/types/common';

interface BoardSearchInputProps {
  register: UseFormRegister<SearchValues>;
}
export default function BoardSearchInput({ register }: BoardSearchInputProps) {
  return (
    <div className="max-w-[220px] w-full h-[32px] px-[1rem] py-[.5rem] pr-[.375rem] flex gap-1 items-center bg-white-10 border-2 border-brown-70 rounded-[50px] max-[440px]:max-w-[170px]">
      <input
        required
        {...register('search')}
        placeholder="검색어를 입력하세요"
        className="h-full w-full bg-transparent text-xs leading-3 placeholder:text-gray-50 focus:outline-none"
      />
      <button
        type="submit"
        className="w-[23px] h-[20px] bg-center bg-cover bg-[url('/assets/img/button_search.svg')]"
      />
    </div>
  );
}
