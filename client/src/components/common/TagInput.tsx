'use client';

import { useState } from 'react';

import { UseFormRegister, UseFormResetField } from 'react-hook-form';

import { DefaultProps, InputValues } from '@/types/common';

import HashTag from './HashTag';

interface TextAreaProps extends DefaultProps {
  id?: string;
  name: 'hashTag';
  register: UseFormRegister<InputValues>;
  resetField: UseFormResetField<InputValues>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const getTypeFormat = () => ({
  validationSchema: {
    minLength: {
      value: 2,
      message: '2글자 이상의 영문 또는 한글을 입력해야 합니다.',
    },
  },
  placeholder: '태그는 쉼표로 구분이 가능합니다.',
});

export default function TagInput({
  id,
  name,
  register,
  resetField,
  tags,
  setTags,
}: TextAreaProps) {
  const [tagContents, setTagContents] = useState('');

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ',') {
      resetField('hashTag');

      setTags((previous) => [...previous, `#${tagContents}`]);
      setTagContents('');
      return;
    }

    if (event.target instanceof HTMLInputElement) {
      const processedContents = event.target.value.replaceAll(',', '');

      setTagContents(processedContents);
    }
  };

  const handleDeleteClick = (index: number) => {
    setTags((tags) => tags.filter((_, i) => i !== index));
  };

  const typeFormat = getTypeFormat();

  return (
    <div className="mb-[8px] w-full h-full border-2 bg-white-10 border-brown-70 p-2 rounded-lg shadow-outer/down leading-3 max-[360px]:max-w-[238px]">
      <div className="flex gap-1 items-center flex-wrap">
        {tags.map((tag, index) => (
          <HashTag
            key={index}
            tag={tag}
            index={index}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
        <input
          id={id}
          onKeyUp={handleKeyUp}
          placeholder={typeFormat?.placeholder}
          className="w-full h-3 px-1 py-2 text-xs placeholder:text-gray-50 focus:outline-0"
          {...register(name, typeFormat?.validationSchema)}
        />
      </div>
    </div>
  );
}
