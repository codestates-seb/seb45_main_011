'use client';

import SigninForm from '@/components/sign/signin/SigninForm';

export default function Signin() {
  return (
    <div>
      로그인 페이지입니다!
      {/* <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center gap-[20px]">
          <SigninInput
            type="email"
            input="text"
            register={register}
            errors={errors}
            watch={watch}
          />
          <SigninInput
            type="nickname"
            input="text"
            register={register}
            errors={errors}
            watch={watch}
          />
          <SigninInput
            type="pw"
            input="pw"
            register={register}
            errors={errors}
            watch={watch}
          />
          <SigninInput
            type="pwCheck"
            input="pw"
            register={register}
            errors={errors}
            watch={watch}
          />
          <button type="submit">로그인</button>
        </div>
      </form> */}
      <SigninForm />
    </div>
  );
}
