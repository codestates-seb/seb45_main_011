'use client';

import Image from 'next/image';
import { useState } from 'react';

import { motion } from 'framer-motion';

import useUserStore from '@/stores/userStore';
import useSignStore from '@/stores/signStore';
import useChatStore from '@/stores/chatStore';

import useClient from '@/hooks/useClient';

import { Logo, HeaderLink, HeaderNav } from '.';

export default function Header() {
  const [isProfileHover, setIsProfileHover] = useState(false);
  const [isMenuHover, setIsMenuHover] = useState(false);

  const { userId, isEmailLogin, isGoogleLogin, isGuestMode, profileImageUrl } =
    useUserStore();
  const { getSigninForm } = useSignStore();
  const { setIsOpen } = useChatStore();

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
        min-w-[348px] 
        w-full 
        h-[60px] 
        px-3
        pt-[1px]
        border-b-[8px] 
        border-border-10
        shadow-outer/down 
        z-50
        ">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(false)}>
          <Logo size="small" className="mt-[2px]" />
        </motion.div>

        <ul
          className="flex items-center gap-2 max-[480px]:gap-3"
          onClick={() => setIsOpen(false)}>
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-end">
                <HeaderNav isMenuHover={isMenuHover} />
              </motion.div>
            )}
          </li>

          <li className="max-[480px]:hidden">
            <HeaderLink
              location={
                isClient && (isEmailLogin || isGoogleLogin || isGuestMode)
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
                isClient && (isEmailLogin || isGoogleLogin || isGuestMode)
                  ? `/leafs/${userId}`
                  : '/signin'
              }
              content="activity"
              title="leafCard"
            />
          </li>

          {isClient && (isEmailLogin || isGoogleLogin || isGuestMode) ? (
            <li
              onMouseOver={() => setIsProfileHover(true)}
              onMouseLeave={() => setIsProfileHover(false)}>
              <Image
                src={profileImageUrl || '/assets/img/bg_default_profile.png'}
                alt="프로필 이미지"
                className={`w-9 h-9 rounded-[50%] border-brown-50 border-[3px] bg-brown-20 cursor-pointer object-cover object-center hover:scale-110 transition-transform`}
                width={36}
                height={36}
              />

              {isProfileHover &&
                (isEmailLogin || isGoogleLogin || isGuestMode) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-end">
                    <HeaderNav isProfileHover={isProfileHover} />
                  </motion.div>
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
