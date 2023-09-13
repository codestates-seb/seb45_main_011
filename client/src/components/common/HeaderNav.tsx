'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

import useUserStore from '@/stores/userStore';
import useSignStore from '@/stores/signStore';

type Hover = {
  isHover: boolean;
};

export default function HeaderNav({ isHover }: Hover) {
  const router = useRouter();

  const setClear = useUserStore((state) => state.setClear);
  const { getSigninForm, getSignupForm } = useSignStore();

  const logout = () => {
    sessionStorage.clear();
    setClear();

    getSigninForm(false);
    getSignupForm(false);

    router.push('/');
  };

  return (
    <>
      {isHover && (
        <div className="absolute">
          <div className="relative top-1 left-[14px] w-[75px] h-fit rounded-lg border-2 border-brown-70 bg-brown-50 ">
            <div className="flex flex-col justify-center items-center text-[12px] text-brown-10 font-bold">
              <div className="w-full flex justify-center items-center border-b border-brown-10 border-dashed py-[8px] border-opacity-80">
                <Link href="/profile">정보 수정</Link>
              </div>
              <div className="w-full flex justify-center items-center  border-b border-brown-10 border-dashed py-[8px] border-opacity-80">
                <Link href="/history/1">내 게시글</Link>
              </div>
              <div
                className="flex justify-center py-[8px] cursor-pointer"
                onClick={logout}>
                로그아웃
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
