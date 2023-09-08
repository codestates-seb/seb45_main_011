'use client';

import { useForm } from 'react-hook-form';

import { SignFormValue } from '@/types/common';

import { postPasswordByEmail } from '@/api/user';

import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';
import SignModalInput from '../common/sign/SignModalInput';
import CommonButton from '../common/CommonButton';

import useSignModalStore from '@/stores/signModalStore';

export default function FindPasswordModal() {
  const { register, watch, handleSubmit } = useForm<SignFormValue>();
  const { close, changeState, toggle } = useSignModalStore();

  const userEmail = watch('email');

  //TODO: 서버에서 받아온 데이터로 회원 email 조회하기
  const developerEmail = 'shimdokite@gmail.com';

  const postNewPassword = async (email: string) => {
    if (!email) return;

    try {
      await postPasswordByEmail(email);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailCheck = (email: string) => {
    if (!userEmail) return;

    if (userEmail === developerEmail) {
      postNewPassword(email);
      return close(), changeState('SuccessedModal');
    }

    return changeState('FailureModal');
  };

  return (
    <ModalPortal>
      <Modal className="min-w-[531px] h-[291px] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-brown-70 text-[24px]">
              가입하셨던 이메일을 입력해주시면
            </p>
            <p className="font-bold text-brown-70  text-[28px]">
              <span className="text-brown-90">임시 비밀번호</span>를
              발송해드립니다.
            </p>
          </div>
          <SignModalInput type="email" register={register} />
        </div>
        <div className="flex gap-2 mt-6">
          <CommonButton
            type="button"
            size="md"
            children="완료"
            className="w-[96px] h-[52px] text-[24px]"
            onCheck={() => {
              handleEmailCheck(userEmail);
            }}
          />
          <CommonButton
            type="button"
            size="md"
            children="취소"
            className="w-[96px] h-[52px] text-[24px]"
            onClose={toggle}
          />
        </div>
      </Modal>
    </ModalPortal>
  );
}
