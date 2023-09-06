'use client';

import { useForm } from 'react-hook-form';

import { DefaultProps, InputValues } from '@/types/common';
import { useState } from 'react';

import HashTag from './HashTag';

type InputName = 'hashTag';

interface TextAreaProps extends DefaultProps {
  name: InputName;
}
const getTypeFormat = (name: string) => {
  if (name === 'hashTag') {
    return {
      validationSchema: {
        minLength: {
          value: 2,
          message: '2글자 이상의 영문 또는 한글을 입력해야 합니다.',
        },
      },
      placeholder: '태그 입력 후 엔터를 눌러주세요.',
    };
  }
  return null;
};

export default function TagInput({ name }: TextAreaProps) {
  const TypeFormat = getTypeFormat(name);
  const [tags, setTags] = useState<string[]>([]);
  const handleTagInputKeyUp = (data: InputValues) => {
    reset();
    setTags((previous) => [...previous, `#${data[name]}`]);
    return;
  };
  const { register, handleSubmit, reset } = useForm<InputValues>();

  const handleDeleteClick = (index: number) => {
    console.log('click!');
    setTags((tags) => tags.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-[8px] w-full h-full border-2 bg-white-10 border-brown-70 p-3 rounded-lg shadow-outer/down leading-3 ">
      <form onSubmit={handleSubmit((data) => handleTagInputKeyUp(data))}>
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
            className="min-w-[250px] placeholder:text-gray-50 focus:outline-0"
            placeholder={TypeFormat?.placeholder}
            {...register(name, TypeFormat?.validationSchema)}
          />
        </div>
      </form>
    </div>
  );
}
