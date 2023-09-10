'use client';

import { useForm } from 'react-hook-form';

import useSignModalStore from '@/stores/signModalStore';
import useSignStore from '@/stores/signStore';

import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';
import SignModalInput from '../sign/SignModalInput';
import CommonButton from '../common/CommonButton';

import { SignFormValue } from '@/types/common';

export default function AuthEmailModal() {
  const { register, watch } = useForm<SignFormValue>();

  const { close, changeState } = useSignModalStore();
  const { code } = useSignStore();

  const userCode = watch('code');

  const handleCodeCheck = () => {
    if (!userCode) return;

    if (userCode === code) {
      return changeState('Successed');
    }

    return changeState('Not Code');
  };

  return (
    <ModalPortal>
      <Modal className="min-w-[531px] h-[291px] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-brown-70 text-[24px]">
              이메일로 전송된
            </p>
            <p className="font-bold text-brown-70  text-[28px]">
              <span className="text-brown-90">인증 번호</span>를 입력해주세요.
            </p>
          </div>
          <SignModalInput type="code" register={register} />
        </div>
        <div className="flex gap-2 mt-6">
          <CommonButton
            type="button"
            size="md"
            children="완료"
            className="w-[96px] h-[52px] text-[24px]"
            onCheck={handleCodeCheck}
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
