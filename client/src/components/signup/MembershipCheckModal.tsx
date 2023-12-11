'use client';

import { useRouter } from 'next/navigation';

import useModalStore from '@/stores/modalStore';

import { CommonButton, Modal } from '../common';

export default function MembershipCheckModal() {
  const router = useRouter();

  const { close } = useModalStore();

  return (
    <Modal className="min-w-[312px] max-w-[400px] flex flex-col justify-center items-center">
      <div className="px-11 py-9 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <p className="max-[884px]:text-[20px] max-[740px]:text-[16px] text-[24px] text-brown-70 font-bold mb-3">
            이미 등록된 이메일입니다.
          </p>

          <p className="max-[884px]:text-[24px] max-[740px]:text-[20px] text-[30px] text-brown-90 font-bold mb-6">
            로그인해주세요.
          </p>
        </div>

        <div>
          <CommonButton
            type="button"
            size="md"
            className="px-5 py-[10px]"
            onGoToLogin={() => {
              router.push('/signin'), close();
            }}>
            로그인 하러 가기
          </CommonButton>
        </div>
      </div>
    </Modal>
  );
}
