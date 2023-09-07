'use client';

import { useRouter } from 'next/navigation';
import { deleteCookie, hasCookie } from 'cookies-next';

import Logo from '../Logo';
import HeaderLink from './HeaderLink';
import { cookieOption } from '@/types/common';

import useSignStore from '@/stores/signStore';

export default function Header() {
  const { isLogin, setIsLogin, getSigninForm, getSignupForm } = useSignStore();
  const router = useRouter();

  const cookieOption: cookieOption = {
    //! 서버와 연동 시 domain, path는 변경해야함
    domain: 'localhost',
    path: '/',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    //! httpOnly: true,
  };

  const logout = () => {
    deleteCookie('accessToken', cookieOption);
    deleteCookie('refreshToken', cookieOption);

    setIsLogin(false);
    getSigninForm(false);
    getSignupForm(false);
    router.push('/');
  };

  return (
    <header
      className="
        flex
        justify-between
        items-center
        bg-[url('/assets/img/bg_wood_yellow.png')] 
        bg-contain
        h-[64px] 
        border-b-[8px] 
        border-border-10
        shadow-outer/down 
        px-[15px]
        ">
      <Logo size="small" />
      <ul className="flex gap-[10px]">
        <li>
          <HeaderLink location="/garden/1" content="activity" title="garden" />
        </li>
        <li>
          <HeaderLink location="/board" content="activity" title="community" />
        </li>
        <li>
          <HeaderLink location="/leafs/1" content="activity" title="leafCard" />
        </li>
        {isLogin ? (
          <li>
            <img
              src="/assets/img/profile_avocado.png"
              alt="profile_img"
              className="rounded-[50%] border-brown-50 border-[3px] w-[44px] h-[44px] cursor-pointer"
              onClick={logout}
            />
          </li>
        ) : (
          <li>
            <HeaderLink location="/signin" content="auth" title="signin" />
          </li>
        )}
      </ul>
    </header>
  );
}
