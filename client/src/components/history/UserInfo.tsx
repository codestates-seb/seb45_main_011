'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { getUserInfo } from '@/api/history';

import useUserStore from '@/stores/userStore';
import useHistoryStore from '@/stores/historyStore';

import useClient from '@/hooks/useClient';

import CommonButton from '../common/CommonButton';

interface HistoryUserProps {
  paramsId: string;
}

export default function UserInfo({ paramsId }: HistoryUserProps) {
  const isClient = useClient();
  const router = useRouter();

  const userId = useUserStore((state) => state.userId);
  const id = paramsId;

  const { setHistoryUser, profileImageUrl, displayName, grade, point } =
    useHistoryStore();

  useEffect(() => {
    const getHistoryData = async () => {
      const response = await getUserInfo(id);

      setHistoryUser(response.data);
    };

    getHistoryData();
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center">
      {isClient && (
        <Image
          src={profileImageUrl || '/assets/img/bg_default_profile.png'}
          className="w-[100px] h-[100px] rounded-[50%] border-brown-50 border-[3px] mb-4 shadow-outer/down object-cover"
          width={100}
          height={100}
          alt="profile_img"
        />
      )}
      <div className="flex flex-col justify-center items-center mb-4 gap-2">
        <div className="text-2xl font-bold text-brown-80">{displayName}</div>
        <p className="font-bold text-brown-70">{grade}</p>
      </div>
      {userId === id ? (
        <div className="flex items-center justify-center bg-[url('/assets/img/bg_board_sm.png')] w-[192px] h-[96px] shadow-outer/down mb-5">
          <div className="flex items-center justify-center gap-2">
            <img src="/assets/img/point.svg" />
            <p className="text-xl font-bold text-brown-10">
              {point?.toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-3 max-[580px]:flex-col items-center">
            <CommonButton
              type="button"
              size="lg"
              children="정원 구경하기"
              className="w-[203px] h-[52px]"
              onGoToGarden={() => router.push(`/garden/${id}`)}
            />
            <CommonButton
              type="button"
              size="lg"
              children="식물 카드 열람"
              className="w-[213px] h-[52px] max-[580px]:w-[203px] text-[20.5px] hover:scale-105 transition-transform"
              onGoToLeafs={() => router.push(`/leafs/${id}`)}
            />
          </div>
          <CommonButton
            type="button"
            size="lg"
            children="작성한 게시글"
            className="w-[203px] h-[52px] text-brown-50 border-brown-50 bg-[url('/assets/img/bg_wood_light.png')] mt-6 cursor-default max-[580px]:mt-3 hover:scale-105 transition-transform"
          />
        </>
      )}
    </div>
  );
}
