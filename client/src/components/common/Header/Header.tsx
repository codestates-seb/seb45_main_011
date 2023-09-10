'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useSignStore from '@/stores/signStore';
import usePesistStore from '@/stores/persistStore';

import Logo from '../Logo';
import HeaderLink from './HeaderLink';

export default function Header() {
  const router = useRouter();
  const { getSigninForm, getSignupForm } = useSignStore();
  const {
    isLogin,
    isGoogleLogin,
    setIsLogin,
    setIsGoogleLogin,
    setAccessToken,
    setRefershToken,
    setDisplayName,
    setProfileImageUrl,
    profileImageUrl,
  } = usePesistStore();

  const logout = () => {
    setAccessToken('');
    setRefershToken('');
    setDisplayName('');
    setProfileImageUrl('');

    setIsLogin(false);
    setIsGoogleLogin(false);

    getSigninForm(false);
    getSignupForm(false);

    router.push('/');
  };

  const profileImage = () => {
    if (!profileImageUrl) return '/assets/img/profile_avocado.png';

    if (isLogin || isGoogleLogin) {
      return profileImageUrl as string;
    }

    return '/assets/img/profile_avocado.png';
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
        {isLogin || isGoogleLogin ? (
          <li>
            <Image
              src={profileImage()}
              alt="profile_img"
              className={`rounded-[50%] border-brown-50 border-[3px] w-11 h-11 cursor-pointer `}
              onClick={logout}
              width={44}
              height={44}
            />
            {/* <img
              src={profileImage()}
              alt="profile_img"
              className="w-11 h-11 rounded-[50%] border-brown-50 border-[3px] cursor-pointer"
              onClick={logout}
            /> */}
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
