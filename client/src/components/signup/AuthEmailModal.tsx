'use client';

import { useForm } from 'react-hook-form';

import { SignFormValue } from '@/types/common';

import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';
import SignModalInput from '../common/sign/SignModalInput';
import CommonButton from '../common/CommonButton';
import useSignModalStore from '@/stores/signModalStore';

export default function AuthEmailModal() {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<SignFormValue>();

  const { close, changeState, currentState, toggle } = useSignModalStore();
  const userCode = watch('code');
  const developerCode = 'test1234';

  const handleCodeCheck = () => {
    if (!userCode) return;

    if (userCode === developerCode) {
      return close(), changeState('Successed');
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
          <SignModalInput
            type="code"
            register={register}
            watch={watch}
            errors={errors}
          />
        </div>
        <div className="flex gap-2 mt-6">
          <CommonButton
            usage="button"
            size="md"
            children="완료"
            className="w-[96px] h-[52px] text-[24px]"
            handleCheck={handleCodeCheck}
          />
          <CommonButton
            usage="button"
            size="md"
            children="취소"
            className="w-[96px] h-[52px] text-[24px]"
            handleClose={toggle}
          />
        </div>
      </Modal>
    </ModalPortal>
  );
}
