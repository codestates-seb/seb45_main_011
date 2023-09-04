'use client';

import SigninForm from '@/components/sign/signin/SigninForm';
import FindPassword from '@/components/sign/signin/FindPassword';

export default function Signin() {
  //TODO: 비밀번호 찾기 버튼을 눌렀다면 FindPassword 컴포넌트 보여주기

  return (
    <div>
      로그인 페이지입니다!
      <SigninForm />
      {/* <FindPassword /> */}
    </div>
  );
}
