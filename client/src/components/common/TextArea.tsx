'use client';

import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

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
        required: '이 필드는 필수 입력 사항입니다. 반드시 값을 입력해주세요.',
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
        required: '이 필드는 필수 입력 사항입니다. 반드시 값을 입력해주세요.',
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
    <div>
      <textarea
        required={required}
        className="mb-[8px] w-full h-full border-2 bg-white-10 border-brown-70 p-3 rounded-lg shadow-outer/down text-xs leading-3 placeholder:text-gray-50 focus:outline-0"
        placeholder={TypeFormat?.placeholder}
        {...register(name, TypeFormat?.validationSchema)}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="pl-3 w-full text-[0.6rem] leading-3 text-red-50">
            {message}
          </p>
        )}
      />
    </div>
  );
}
