'use client';

import { useState } from 'react';
import Image from 'next/image';

import useUserStore from '@/stores/userStore';
import useSignStore from '@/stores/signStore';

import useClient from '@/hooks/useClient';

import Logo from './Logo';
import HeaderLink from './HeaderLink';
import HeaderNav from './HeaderNav';

export default function Header() {
  const [isProfileHover, setIsProfileHover] = useState(false);
  const [isMenuHover, setIsMenuHover] = useState(false);

  const { userId, isLogin, isGoogleLogin, profileImageUrl } = useUserStore();
  const getSigninForm = useSignStore((state) => state.getSigninForm);

  const isClient = useClient();

  return (
    <>
      <header
        className="
        fixed
        top-0
        flex
        justify-between
        items-center
        bg-[url('/assets/img/bg_wood_yellow.png')] 
        bg-contain 
        min-w-[360px] 
        w-full 
        h-[60px] 
        px-3
        pt-[1px]
        border-b-[8px] 
        border-border-10
        shadow-outer/down 
        z-20
        ">
        <Logo size="small" className="mt-[2px]" />
        <ul className="flex items-center gap-2 max-[480px]:gap-3">
          <li
            onMouseOver={() => setIsMenuHover(true)}
            onMouseLeave={() => setIsMenuHover(false)}
            className="min-[481px]:hidden">
            <Image
              src="/assets/img/hamburger.svg"
              alt="햄버거 버튼"
              width={28}
              height={24}
              className="hover:scale-105 transition-transform"
              style={{ width: 28, height: 24 }}
            />
            {isMenuHover && (
              <div className="flex justify-end">
                <HeaderNav isMenuHover={isMenuHover} />
              </div>
            )}
          </li>
          <li className="max-[480px]:hidden">
            <HeaderLink
              location={
                isClient && (isLogin || isGoogleLogin)
                  ? `/garden/${userId}`
                  : '/signin'
              }
              content="activity"
              title="garden"
            />
          </li>
          <li className="max-[480px]:hidden">
            <HeaderLink
              location="/board"
              content="activity"
              title="community"
            />
          </li>
          <li className="max-[480px]:hidden">
            <HeaderLink
              location={
                isClient && (isLogin || isGoogleLogin)
                  ? `/leafs/${userId}`
                  : '/signin'
              }
              content="activity"
              title="leafCard"
            />
          </li>
          {isClient && (isLogin || isGoogleLogin) ? (
            <li
              onMouseOver={() => setIsProfileHover(true)}
              onMouseLeave={() => setIsProfileHover(false)}>
              <Image
                src={profileImageUrl || '/assets/img/bg_default_profile.png'}
                alt="프로필 이미지"
                className={`w-9 h-9 rounded-[50%] border-brown-50 border-[3px] cursor-pointer hover:scale-110 transition-transform`}
                width={36}
                height={36}
              />
              {isProfileHover && (isLogin || isGoogleLogin) && (
                <div className="flex justify-end">
                  <HeaderNav isProfileHover={isProfileHover} />
                </div>
              )}
            </li>
          ) : (
            <li onClick={() => getSigninForm(false)}>
              <HeaderLink location="/signin" content="auth" title="signin" />
            </li>
          )}
        </ul>
      </header>
    </>
  );
}
