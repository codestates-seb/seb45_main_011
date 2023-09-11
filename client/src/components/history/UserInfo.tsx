'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { getLeafsByUserId } from '@/api/leaf';

import useUserStore from '@/stores/userStore';

import CommonButton from '../common/CommonButton';

type Token = {
  token: string;
};

export default function UserInfo({ token }: Token) {
  // const [data, setData] = useState('123');

  // setData('abc'); // 1. 렌더링할거야 하고 예약만한다. 2. 값을 바꾼다.(abc로) 3. 할거 다하고 4. 렌더링한다.
  // [data, setData] = useReducer();
  // 리액트의 탄생 이유는 리렌더링 최소화입니다.
  // 데이터를 넣고 렌더링하는게 아니고 렌더링하는겸 데이터를 갱신해준다.

  // document.querySelector('button')?.click();
  const [grade, setGrade] = useState('브론즈 가드너');

  const { id } = useParams();
  const userId = useUserStore((state) => state.userId);

  const { isGoogleLogin, isLogin, profileImageUrl, displayName, point } =
    useUserStore();

  const profileImage = () => {
    if (!profileImageUrl) return '/assets/img/bg_default_profile.png';

    if (isLogin || isGoogleLogin) {
      return profileImageUrl;
    }
  };

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        //TODO: 서버에서 식물 카드 전체 조회 시 length로 순위 매기기
        // const getLeafCard = await getLeafsByUserId(userId);
        // console.log(getLeafCard);
        const userLeafCardAmount = 100;

        if (50 < userLeafCardAmount && userLeafCardAmount < 100) {
          return setGrade('실버 가드너');
        }

        if (100 < userLeafCardAmount) {
          return setGrade('골드 가드너');
        }
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
        className="w-[100px] h-[100px] rounded-[50%] border-brown-50 border-[3px] mb-4 shadow-outer/down"
        alt="profile_img"
      />
      <div className="flex flex-col justify-center items-center mb-4 gap-2">
        <div className="text-2xl font-bold text-brown-80">
          {token ? displayName : null}
        </div>
        <p className="font-bold text-brown-70">{grade}</p>
      </div>
      {userId === +id ? (
        <div className="flex items-center justify-center gap-2 bg-[url('/assets/img/bg_board_sm.png')] w-[192px] h-[96px] shadow-outer/down mb-5">
          <img src="/assets/img/point.svg" />
          <p className="text-xl font-bold text-brown-10">{point}</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-3">
            <CommonButton
              type="button"
              size="lg"
              children="정원 구경하기"
              className="w-[203px] h-[52px]"
            />
            <CommonButton
              type="button"
              size="lg"
              children="식물 카드 열람"
              className="w-[213px] h-[52px]"
              // 식물 전체 페이지? 상세 페이지...?
            />
          </div>
          <CommonButton
            type="button"
            size="lg"
            children="작성한 게시글"
            className="w-[203px] h-[52px] text-brown-50 border-brown-50 bg-[url('/assets/img/bg_wood_light.png')] mt-6 cursor-default"
          />
        </>
      )}
    </div>
  );
}
