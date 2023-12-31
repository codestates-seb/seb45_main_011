import { SIGN_VAILDATION } from '@/constants/contents';

export default function getRegisterByType(type: string) {
  if (type === 'email') {
    return {
      validation: {
        required: true,
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: SIGN_VAILDATION[type],
        },
      },
    };
  }

  if (type === 'code') {
    return {
      validation: {
        required: true,
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/,
          message: SIGN_VAILDATION[type],
        },
      },
    };
  }

  if (type === 'nickname') {
    return {
      validation: {
        required: true,
        pattern: {
          value: /^[가-힣a-zA-Z]+$/,
          message: SIGN_VAILDATION.nickname,
        },
        minLength: {
          value: 2,
          message: SIGN_VAILDATION.nickname,
        },
        maxLength: {
          value: 6,
          message: SIGN_VAILDATION.maxLength,
        },
      },
    };
  }

  if (type === 'password') {
    return {
      validation: {
        required: true,
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
          message: SIGN_VAILDATION[type],
        },
      },
    };
  }

  return null;
}
