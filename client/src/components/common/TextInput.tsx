'use client';

import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { twMerge } from 'tailwind-merge';

import { DefaultProps, InputValues } from '@/types/common';

import getTextInputTypeFormat from '@/utils/getTextInputTypeFormat';

interface TextInputProps extends DefaultProps {
  id?: string;
  name: 'plantName' | 'title' | 'nickname';
  register: UseFormRegister<InputValues>;
  errors: FieldErrors<InputValues>;
  required?: boolean;
}

export default function TextInput({
  id,
  name,
  register,
  errors,
  required,
  className,
}: TextInputProps) {
  const TypeFormat = getTextInputTypeFormat(name);

  return (
    <div
      className={twMerge(
        `w-full flex flex-col ${INPUT_SIZE[name]}`,
        className,
      )}>
      <input
        id={id}
        required={required}
        className="w-full h-[36px] bg-white-10 border-2 border-brown-70 p-[10px] rounded-lg shadow-outer/down text-xs leading-3 placeholder:text-gray-50 focus:outline-0"
        type="text"
        placeholder={TypeFormat?.placeholder}
        autoComplete="off"
        {...register(name, TypeFormat?.validationSchema)}
      />
      <div className="h-[12px] mt-[8px] mb-2 pl-3 w-full text-[0.6rem] leading-3 text-red-50">
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <p>{message}</p>}
        />
      </div>
    </div>
  );
}

const INPUT_SIZE = {
  plantName: 'max-w-[369px]',
  title: 'max-w-[369px]',
  nickname: 'max-w-[248px]',
};
