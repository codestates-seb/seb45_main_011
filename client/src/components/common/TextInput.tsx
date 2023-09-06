'use client';

import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { DefaultProps, InputValues } from '@/types/common';

type InputName = 'plantName' | 'title' | 'nickname';

interface TextInputProps extends DefaultProps {
  name: InputName;
  register: UseFormRegister<InputValues>;
  errors: FieldErrors<InputValues>;
  required?: boolean;
}

/**
 * 입력 필드 유형(`name`)에 따라 유효성 검사 스키마 및 placeholder를 반환합니다.
 *
 * @param {string} name - 입력 필드의 이름 (예: 'plantName', 'title', 'nickname', 'password', 'newPassword', 'newPasswordCheck').
 * @returns {object | null} - 입력 필드에 대한 유효성 검사 스키마와 플레이스홀더를 포함하는 객체 또는 `null` (유효하지 않은 `name`인 경우).
 */
const getTypeFormat = (name: string) => {
  if (name === 'plantName') {
    return {
      validationSchema: {
        required: '이 필드는 필수 입력 사항입니다. 반드시 값을 입력해주세요.',
        minLength: {
          value: 2,
          message: '2글자 이상의 영문 또는 한글을 입력해야 합니다.',
        },
      },
      placeholder: '식물 이름을 입력해주세요.',
    };
  }
  if (name === 'title') {
    return {
      validationSchema: {
        required: '이 필드는 필수 입력 사항입니다. 반드시 값을 입력해주세요.',
        minLength: {
          value: 2,
          message: '2글자 이상의 영문 또는 한글을 입력해야 합니다.',
        },
      },
      placeholder: '제목을 입력해주세요.',
    };
  }
  if (name === 'nickname') {
    return {
      validationSchema: {
        required: '이 필드는 필수 입력 사항입니다. 반드시 값을 입력해주세요.',
        minLength: {
          value: 2,
          message: '2글자 이상의 영문 또는 한글을 입력해야 합니다.',
        },
      },
      placeholder: '닉네임을 입력해주세요.',
    };
  }
  return null;
};

export default function TextInput({
  name,
  register,
  errors,
  required,
}: TextInputProps) {
  const TypeFormat = getTypeFormat(name);

  if (TypeFormat === null) return null;
  return (
    <div>
      <input
        required={required}
        className="mb-[8px] w-full bg-white-10 border-2 border-brown-70 p-3 rounded-lg shadow-outer/down text-xs leading-3 placeholder:text-gray-50 focus:outline-0"
        type="text"
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
