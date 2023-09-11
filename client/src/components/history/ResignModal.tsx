'use client';

import { useForm } from 'react-hook-form';

import { postUserPassword } from '@/api/history';

import useSignModalStore from '@/stores/signModalStore';
import useUserStore from '@/stores/userStore';

import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';
import SignModalInput from '../sign/SignModalInput';
import CommonButton from '../common/CommonButton';

import { SignFormValue } from '@/types/common';

export default function ResignModal() {
  const { register, watch } = useForm<SignFormValue>();

  const token = useUserStore((state) => state.accessToken);
  const { close, changeState } = useSignModalStore();

  const userPassword = watch('password');

  const handlePasswordCheck = async () => {
    if (!userPassword) return;

    try {
      const response = await postUserPassword(userPassword, token);
      if (response.data.data) {
        return changeState('ComfirmModal');
      }
    } catch (error) {
      console.log(error);
    }

    return changeState('FailureModal');
  };

  return (
    <ModalPortal>
      <Modal className="min-w-[531px] h-[350px] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-brown-70 text-[32px] leading-5">
              탈퇴하시려면
            </p>
            <div className="flex flex-col items-center font-bold text-brown-70 text-[32px]">
              <p className="text-brown-80 text-4xl">가입 시 등록하셨던</p>
              <div className="text-brown-80 text-4xl">
                비밀번호
                <span className="text-brown-70 text-[32px]">
                  를 입력해주세요.
                </span>
              </div>
            </div>
          </div>
          <SignModalInput type="password" register={register} />
        </div>
        <div className="flex gap-2 mt-6">
          <CommonButton
            type="button"
            size="md"
            children="완료"
            className="w-[96px] h-[52px] text-[24px]"
            onCheck={handlePasswordCheck}
          />
          <CommonButton
            type="button"
            size="md"
            children="취소"
            className="w-[96px] h-[52px] text-[24px]"
            onClose={close}
          />
        </div>
      </Modal>
    </ModalPortal>
  );
}
