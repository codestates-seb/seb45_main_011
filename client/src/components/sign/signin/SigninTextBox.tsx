'use cilent';

import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { SIGNIN_REQUIRE, SIGNIN_VAILDATION } from '@/constants/contents';
import CommonButton from '@/components/common/CommonButton';

// 로그인에 들어갈 데이터 타입 정의
interface FormValue {
  email: string;
  password: string;
}

export default function SigninTextBox() {
  const {
    register, // Input에 특정 항목을 입력받을 것이라는 것을 등록해주는 역할
    handleSubmit, // 각 항목이 입력되었을 때(= 유효성을 통과했을 때) submit 이벤트를 처리하는 역할
    watch, // register 한 항목의 변경사항을 추적하는 역할
    formState: { errors }, // 유효성이 통과되지 않으면 에러 상태를 내보내주는 역할
  } = useForm<FormValue>(); //! <FormValue>를 넣어서 입력받을 데이터의 타입들을 react-hook-form에 전달한다

  // Submit Button
  const handleOnSubmit: SubmitHandler<FormValue> = (data) => {
    // 모든 항목이 정상적으로 입력되었을 때 처리할 로직으로 변경 예정
    // data는 key:value의 객체 형태로 들어온다
    console.log(data);
  };

  // Error Message
  const emailError = (errors: FieldErrors<FieldValues>) => {
    if (errors.email && errors.email.type === 'pattern') {
      return (
        <div className="text-[10px] text-red-50 leading-3 ml-10 my-2">
          {errors.email.message?.toString()}
        </div>
      );
    }
  };

  const passwordError = (errors: FieldErrors<FieldValues>) => {
    if (
      errors.password &&
      (errors.password.type === 'pattern' ||
        errors.password.type === 'minLength')
    ) {
      return (
        <div className="text-[10px] text-red-50 leading-3 ml-10 my-2">
          {errors.password.message?.toString()}
        </div>
      );
    }
  };

  // console.log(errors);

  // Input Register
  const emailRegister = {
    ...register('email', {
      // register 옆에 항목을 문자열로 넣어주면 해당 데이터만 받는 input이 된다
      // required: true,
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: SIGNIN_VAILDATION.email,
      },
    }),
  };

  const passwordRegister = {
    ...register('password', {
      // required: true,
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        message: SIGNIN_VAILDATION.pw,
      },
      minLength: {
        value: 6,
        message: SIGNIN_VAILDATION.pw,
      },
    }),
  };

  return (
    <form
      className="flex flex-col w-[300px] gap-5"
      onSubmit={handleSubmit(handleOnSubmit)}>
      <div>
        <input
          className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG.email} leading-[12px] outline-none shadow-outer/down`}
          placeholder={SIGNIN_REQUIRE.email}
          type="email"
          {...emailRegister}
        />
        {emailError(errors)}
      </div>
      <div className="mb-[20px]">
        <input
          className={`min-w-[300px] pl-9 py-[10px] font-normal text-[12px] border-2 border-brown-70 rounded-lg bg-[center_left_12px] bg-no-repeat ${SIGN_INPUT_BG.pw} leading-[12px] outline-none shadow-outer/down`}
          placeholder={SIGNIN_REQUIRE.pw}
          {...passwordRegister}
          type="password"
        />
        {passwordError(errors)}
      </div>
      <div className="flex gap-2 justify-center ">
        <CommonButton
          usage="submit"
          size="sm"
          children="로그인"
          className="w-[92px] h-[44px] text-[20px]"
        />
        <CommonButton
          usage="submit"
          size="sm"
          children="비밀번호 찾기"
          className="w-[161px] h-[44px] text-[20px]"
        />
      </div>
    </form>
  );
}

const SIGN_INPUT_BG = {
  email: `bg-[url('/assets/icon/email.svg')]`,
  pw: `bg-[url('/assets/icon/pw.svg')]`,
};
