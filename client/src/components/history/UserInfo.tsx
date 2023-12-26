'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useUserStore from '@/stores/userStore';

import useClient from '@/hooks/useClient';
import useUserInfoQuery from '@/hooks/query/useUserInfoQuery';

import { CommonButton } from '../common';

interface HistoryUserProps {
  paramsId: string;
}

export default function UserInfo({ paramsId }: HistoryUserProps) {
  const id = paramsId;

  const router = useRouter();

  const { userId } = useUserStore();

  const isClient = useClient();
  const { profileImageUrl, displayName, grade, point } = useUserInfoQuery(id);

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

      <section className="flex flex-col justify-center items-center mb-6 gap-2">
        <h3 className="text-2xl font-bold text-brown-80">{displayName}</h3>

        <h4 className="font-bold text-brown-70">{grade}</h4>
      </section>

      {userId === id ? (
        <section className="flex items-center justify-center bg-[url('/assets/img/bg_board_sm.png')] w-[192px] h-[96px] shadow-outer/down mb-5">
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/assets/img/point.svg"
              alt="point icon"
              width={24}
              height={24}
            />

            <p className="text-xl font-bold text-brown-10">
              {point?.toLocaleString()}
            </p>
          </div>
        </section>
      ) : (
        <>
          <div className="flex justify-center gap-3 max-[580px]:flex-col items-center">
            <CommonButton
              type="button"
              size="lg"
              className="w-[196px] h-[52px] text-[22px] px-4"
              onGoToGarden={() => router.push(`/garden/${id}`)}>
              정원 구경하기
            </CommonButton>

            <CommonButton
              type="button"
              size="lg"
              className="w-[196px] h-[52px] text-[22px] px-4"
              onGoToLeafs={() => router.push(`/leafs/${id}`)}>
              식물 카드 열람
            </CommonButton>
          </div>

          <CommonButton
            type="button"
            size="lg"
            className="w-[203px] h-[52px] text-brown-50 border-brown-50 bg-[url('/assets/img/bg_wood_light.png')] mt-6 cursor-default max-[580px]:mt-3">
            작성한 게시글
          </CommonButton>
        </>
      )}
    </div>
  );
}
