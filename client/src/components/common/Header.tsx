'use client';

import Image from 'next/image';
import { useState } from 'react';

import useUserStore from '@/stores/userStore';

import useClient from '@/hooks/useClient';

import Logo from './Logo';
import HeaderLink from './HeaderLink';
import HeaderNav from './HeaderNav';

export default function Header() {
  const [isHover, setIsHover] = useState(false);
  const { isLogin, isGoogleLogin, profileImageUrl } = useUserStore();
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
        min-w-[480px] 
        w-full 
        h-[60px] 
        px-3
        pt-[1px]
        border-b-[8px] 
        border-border-10
        shadow-outer/down 
        z-20
        ">
        <Logo size="small" />
        <ul className="flex gap-2">
          <li>
            <HeaderLink
              location="/garden/1"
              content="activity"
              title="garden"
            />
          </li>
          <li>
            <HeaderLink
              location="/board"
              content="activity"
              title="community"
            />
          </li>
          <li>
            <HeaderLink
              location="/leafs/1"
              content="activity"
              title="leafCard"
            />
          </li>
          {isClient && (isLogin || isGoogleLogin) ? (
            <li
              onMouseOver={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}>
              <Image
                src={profileImageUrl || '/assets/img/bg_default_profile.png'}
                alt="profile_img"
                className={`rounded-[50%] border-brown-50 border-[3px] w-9 h-9 cursor-pointer hover:scale-110 transition-transform`}
                width={36}
                height={36}
              />
              {isHover && (isLogin || isGoogleLogin) && (
                <div className="flex justify-end">
                  <HeaderNav isHover={isHover} />
                </div>
              )}
            </li>
          ) : (
            <li>
              <HeaderLink location="/signin" content="auth" title="signin" />
            </li>
          )}
        </ul>
      </header>
    </>
  );
}
