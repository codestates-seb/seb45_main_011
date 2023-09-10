import { useForm } from 'react-hook-form';

import BoardSearchInput from './BoardSearchInput';

import { SearchValues } from '@/types/common';

export default function BoardSearchForm() {
  const { register, handleSubmit } = useForm<SearchValues>();

  const handleSearch = (inputs: SearchValues) => {
    console.log(inputs);
  };
  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <BoardSearchInput register={register} />
    </form>
  );
}
