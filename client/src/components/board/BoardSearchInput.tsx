import { UseFormRegister } from 'react-hook-form';

import useBoardStore from '@/stores/boardStore';

import { SearchValues } from '@/types/common';

interface BoardSearchInputProps {
  register: UseFormRegister<SearchValues>;
  isSubmitting: boolean;
}
export default function BoardSearchInput({
  register,
  isSubmitting,
}: BoardSearchInputProps) {
  const { setSearchKey } = useBoardStore();

  const clearSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == '') setSearchKey(null);
  };
  return (
    <div className="w-full max-w-[220px] h-[32px] px-3 py-[.5rem] pr-[.375rem] flex gap-1 items-center bg-white-10 border-2 border-brown-70 rounded-[50px] shadow-outer/down max-[440px]:max-w-[180px]">
      <input
        required
        {...register('search', {
          onChange: clearSearchKey,
        })}
        placeholder="검색어를 입력하세요"
        className="h-full w-full bg-transparent text-xs leading-3 placeholder:text-gray-50 focus:outline-none"
      />
      <button
        type="submit"
        className="w-[23px] h-[20px] bg-center bg-cover bg-[url('/assets/img/button_search.svg')]"
        disabled={isSubmitting}
      />
    </div>
  );
}
