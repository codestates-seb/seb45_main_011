import { SIGNIN_REQUIRE, SIGNIN_VAILDATION } from '@/constants/contents';
import { SignFormValue } from '@/types/common';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

interface SignModalInputProps {
  type: 'code' | 'email';
  register: UseFormRegister<SignFormValue>;
  errors: FieldErrors<SignFormValue>;
  watch: UseFormWatch<SignFormValue>;
}

export default function SignModalInput({
  type,
  register,
  errors,
  watch,
}: SignModalInputProps) {
  const getRegisterByType = (
    type: string,
    watch: UseFormWatch<SignFormValue>,
  ) => {
    if (type === 'email') {
      return {
        validation: {
          required: '이 필드는 필수 입력 사항입니다. 반드시 값을 입력해주세요.',
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/,
            message: SIGNIN_VAILDATION[type],
          },
        },
      };
    }

    if (type === 'password') {
      return {
        validation: {
          required: '이 필드는 필수 입력 사항입니다. 반드시 값을 입력해주세요.',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: SIGNIN_VAILDATION[type],
          },
        },
      };
    }

    return null;
  };

  const registerFormat = getRegisterByType(type, watch);

  return (
    <>
      <input
        type="text"
        autoComplete="off"
        className={`min-w-[300px] pl-4 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-[50px] bg-[center_left_12px] bg-no-repeat leading-[12px] outline-none shadow-outer/down`}
        placeholder={SIGNIN_REQUIRE[type]}
        {...register(type, registerFormat?.validation)}
      />
    </>
  );
}
