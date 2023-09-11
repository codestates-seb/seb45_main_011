'use client';

import { useEffect } from 'react';

import { getUserInfo } from '@/api/history';

import useUserStore from '@/stores/userStore';

type Token = {
  token: string;
};

export default function UserInfo({ token }: Token) {
  const {
    isGoogleLogin,
    isLogin,
    profileImageUrl,
    displayName,
    point,
    setPoint,
  } = useUserStore();

  const profileImage = () => {
    if (!profileImageUrl) return '/assets/img/profile_hitmontop.png';

    if (isLogin || isGoogleLogin) {
      return profileImageUrl;
    }
  };

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const response = await getUserInfo(token);

        setPoint(response.data.data.point.toLocaleString());
      } catch (error) {
        console.error(error);
      }
    };

    getHistoryData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src={profileImage()}
        className="w-[100px] h-[100px] rounded-[50%] border-brown-50 border-[3px] cursor-pointer mb-4 shadow-outer/down"
        alt="profile_img"
      />
      <div className="flex flex-col justify-center items-center mb-4 gap-2">
        <div className="text-2xl font-bold text-brown-80">
          {token ? displayName : null}
        </div>
        <p className="font-bold text-brown-70">브론즈 가드너</p>
      </div>
      <div className="flex items-center justify-center gap-2 bg-[url('/assets/img/bg_board_sm.png')] w-[192px] h-[96px] shadow-outer/down mb-5">
        <img src="/assets/img/point.svg" />
        <p className="text-xl font-bold text-brown-10">{point}</p>
      </div>
    </div>
  );
}
