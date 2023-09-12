'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import useUserStore from '@/stores/userStore';
import useSignModalStore from '@/stores/signModalStore';

import UserInfo from './UserInfo';
import HistoryBoard from './HistoryBoard';

import CommonButton from '../common/CommonButton';

export default function HistoryForm() {
  const router = useRouter();
  const token = useUserStore((state) => state.accessToken);
  const { changeState } = useSignModalStore();
  const isClient = useClient();

  const handleResignModal = () => {
    changeState('ResignModal');
  };

  return (
    <>
      {isClient && (
        <div className="relative flex flex-col items-center justify-center bg-[url('/assets/img/bg_wood_yellow.png')] w-[720px] h-[635px] rounded-[12px] border-8 border-border-30 shadow-outer/down shadow-container border-gradient">
          <div className="w-full flex justify-end gap-3 mt-6 mr-6 mb-4">
            <CommonButton
              type="button"
              size="md"
              children="정보 수정"
              className="w-[121px] h-[44px]"
              onProfile={() => router.push('/profile')}
            />
            <CommonButton
              type="button"
              size="md"
              children="회원 탈퇴"
              className="w-[121px] h-[44px]"
              onOpen={() => handleResignModal()}
            />
          </div>
          <div className="mb-5">
            <UserInfo token={token} />
          </div>

          <div className="w-[95%] flex flex-col items-start ml-7 overflow-hidden">
            <HistoryBoard token={token} />
          </div>
        </div>
      )}
    </>
  );
}

const useClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
