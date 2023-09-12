'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useSignStore from '@/stores/signStore';
import useUserStore from '@/stores/userStore';

import Logo from './Logo';
import HeaderLink from '@/components/common/HeaderLink';

export default function Header() {
  const router = useRouter();
  const { getSigninForm, getSignupForm } = useSignStore();
  const { isLogin, isGoogleLogin, profileImageUrl, setClear } = useUserStore();

  const logout = () => {
    sessionStorage.clear();
    setClear();

    getSigninForm(false);
    getSignupForm(false);

    router.push('/');
  };

  const profileImage = () => {
    if (!profileImageUrl) return '/assets/img/profile_hitmontop.png';

    if (isLogin || isGoogleLogin) {
      return profileImageUrl as string;
    }

    return '/assets/img/profile_avocado.png';
  };

  return (
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
        z-10
        ">
      <Logo size="small" />
      <ul className="flex gap-2">
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
              className={`rounded-[50%] border-brown-50 border-[3px] w-11 h-11 cursor-pointer`}
              onClick={logout}
              width={38}
              height={38}
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
