import { UseFormWatch } from 'react-hook-form';

import { SignFormValue } from '@/types/common';

import { SIGN_VAILDATION } from '@/constants/contents';

export default function getPasswordByType(
  tag: string,
  watch?: UseFormWatch<SignFormValue>,
) {
  if (tag === 'password') {
    return {
      validation: {
        required: true,
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
          message: SIGN_VAILDATION[tag],
        },
      },
    };
  }

  if (tag === 'passwordCheck' && watch) {
    return {
      validation: {
        required: true,
        validate: (value: string) =>
          value === watch('password') || SIGN_VAILDATION[tag],
      },
    };
  }

  return null;
}
