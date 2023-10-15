import { useForm } from 'react-hook-form';

import useBoardStore from '@/stores/boardStore';

import BoardSearchInput from './BoardSearchInput';

import { SearchValues } from '@/types/common';

export default function BoardSearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchValues>();

  const setSearchKey = useBoardStore((state) => state.setSearchKey);

  const handleSearch = (inputs: SearchValues) => setSearchKey(inputs.search);

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <BoardSearchInput register={register} isSubmitting={isSubmitting} />
    </form>
  );
}
