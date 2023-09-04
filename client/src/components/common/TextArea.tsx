'use client';

import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { DefaultProps, InputValues } from '@/types/common';

type InputName = 'leafContent' | 'diaryContent';

interface TextAreaProps extends DefaultProps {
  name: InputName;
  register: UseFormRegister<InputValues>;
  errors: FieldErrors<InputValues>;
  required?: boolean;
}
const getTypeFormat = (name: string) => {
  if (name === 'leafContent') {
    return {
      validationSchema: {
        minLength: {
          value: 2,
          message: '2글자 이상의 영문 또는 한글을 입력해야 합니다.',
        },
      },
      placeholder: '간단한 설명을 입력해주세요.',
    };
  }
  if (name === 'diaryContent') {
    return {
      validationSchema: {
        minLength: {
          value: 2,
          message: '2글자 이상의 영문 또는 한글을 입력해야 합니다.',
        },
      },
      placeholder: '내용을 입력해주세요.',
    };
  }
  return null;
};
export default function TextArea({
  name,
  register,
  errors,
  required,
}: TextAreaProps) {
  const TypeFormat = getTypeFormat(name);
  return (
    <div className={`flex flex-col w-full ${TEXTAREA_CONTAINER_SIZE[name]}`}>
      <textarea
        required={required}
        className={`border-2 bg-white-10 border-brown-70 p-3 rounded-lg shadow-outer/down text-xs leading-3 placeholder:text-gray-50 focus:outline-0 resize-none ${TEXTAREA_SIZE[name]}`}
        placeholder={TypeFormat?.placeholder}
        {...register(name, TypeFormat?.validationSchema)}
      />

      <div className="h-[12px] mt-[8px] pl-3 w-full text-[0.6rem] l+eading-3 text-red-50">
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <p>{message}</p>}
        />
      </div>
    </div>
  );
}

const TEXTAREA_SIZE = {
  leafContent: 'max-w-[248px] h-[72px]',
  diaryContent: 'max-w-[369px] h-[120px]',
};

const TEXTAREA_CONTAINER_SIZE = {
  leafContent: 'max-w-[248px] h-[92px]',
  diaryContent: 'max-w-[369px] h-[140px]',
};
