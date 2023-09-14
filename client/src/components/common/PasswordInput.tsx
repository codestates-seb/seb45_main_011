'use client';

import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { DefaultProps, InputValues } from '@/types/common';

type InputName = 'password' | 'newPassword' | 'newPasswordCheck';

interface PasswordInputProps extends DefaultProps {
  name: InputName;
  register: UseFormRegister<InputValues>;
  errors: FieldErrors<InputValues>;
  watch?: UseFormWatch<InputValues>;
  required?: boolean;
  password?: string;
}

/**
 * 입력 필드 유형(`name`)에 따라 유효성 검사 스키마 및 placeholder를 반환합니다.
 * password의 경우 매개변수 password, newPasswordCheck의 경우 매개변수 watch를 포함해서 보내줘야 합니다.
 *
 * @param {string} name - 입력 필드의 이름 (예: 'plantName', 'title', 'nickname', 'password', 'newPassword', 'newPasswordCheck').
 * @param {UseFormWatch<InputValues>} [watch] - 다른 입력 필드를 감시할 때 사용하는 react-hook-form의 `watch` 함수.
 * @param {string} [password] - 'password' 입력 필드의 경우 비밀번호 확인을 위한 기존 비밀번호.
 * @returns {object | null} - 입력 필드에 대한 유효성 검사 스키마와 플레이스홀더를 포함하는 객체 또는 `null` (유효하지 않은 `name`인 경우).
 */
const getTypeFormat = (
  name: string,
  watch?: UseFormWatch<InputValues>,
  password?: string,
) => {
  if (name === 'password' && watch) {
    return {
      validationSchema: {
        required: '이 필드는 필수 입력 사항입니다.',
        validate: (value: string) =>
          /**
           * 다른 컴포넌트에서 watch로 잡은 password를 넘기면
           * 이슈가 발생해서 해당 validate에서 watch를 잡았습니다...
           */
          value === watch('password') || '비밀번호가 일치하지 않습니다.',
      },
      placeholder: '기존 비밀번호를 입력해주세요.',
    };
  }
  if (name === 'newPassword') {
    return {
      validationSchema: {
        required: '이 필드는 필수 입력 사항입니다.',
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
          message: '6-12글자의 영문과 숫자를 함께 사용해야 합니다.',
        },
      },
      placeholder: '새 비밀번호를 입력해주세요.',
    };
  }
  if (name === 'newPasswordCheck' && watch) {
    return {
      validationSchema: {
        required: '이 필드는 필수 입력 사항입니다.',
        validate: (value: string) =>
          value === watch('newPassword') || '비밀번호가 일치하지 않습니다.',
      },
      placeholder: '비밀번호를 다시 입력해주세요.',
    };
  }
  return null;
};

export default function PasswordInput({
  name,
  register,
  errors,
  watch,
  required,
  password,
  className,
}: PasswordInputProps) {
  const TypeFormat = getTypeFormat(name, watch, password);

  if (TypeFormat === null) return null;
  return (
    <div
      className={twMerge(
        `w-full flex flex-col justify-center ${INPUT_SIZE[name]}`,
        className,
      )}>
      <input
        id={name}
        required={required}
        className="w-full h-[36px] bg-white-10 border-2 border-brown-70 p-3 rounded-lg shadow-outer/down text-xs leading-3 placeholder:text-gray-50 focus:outline-0"
        type="password"
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
  password: 'max-w-[248px] ',
  newPassword: 'max-w-[248px]',
  newPasswordCheck: 'max-w-[248px]',
};
