import { UseFormRegister } from 'react-hook-form';

import { SignFormValue } from '@/types/common';

import { SIGN_REQUIRE } from '@/constants/contents';

import getRegisterByType from '@/utils/getRegisterByType';

interface SignModalInputProps {
  type: 'code' | 'email' | 'password';

  register: UseFormRegister<SignFormValue>;
}

export default function SignModalInput({
  type,
  register,
}: SignModalInputProps) {
  const registerFormat = getRegisterByType(type);

  return (
    <section>
      <input
        type={type}
        autoComplete="off"
        className={`w-full max-w-[300px] pl-4 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-[50px] bg-[center_left_12px] bg-no-repeat leading-[12px] outline-none shadow-outer/down max-[705px]:py-[6px]`}
        placeholder={SIGN_REQUIRE[type]}
        required
        {...register(type, registerFormat?.validation)}
      />
    </section>
  );
}
