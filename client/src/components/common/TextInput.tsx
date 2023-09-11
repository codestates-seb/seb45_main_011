'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

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
}: TextInputProps) {
  const TypeFormat = getTextInputTypeFormat(name);

  return (
    <div className={`w-full flex flex-col ', ${INPUT_SIZE[name]}`}>
      <input
        id={id}
        required={required}
        className="w-full h-[36px] bg-white-10 border-2 border-brown-70 p-[10px] rounded-lg shadow-outer/down text-xs leading-3 placeholder:text-gray-50 focus:outline-0"
        type="text"
        placeholder={TypeFormat?.placeholder}
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
  plantName: 'max-w-[248px] ',
  title: 'max-w-[369px]',
  nickname: 'max-w-[248px]',
};
