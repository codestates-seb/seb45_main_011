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
  const code = useSignStore((state) => state.code);

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
      <Modal className="w-full min-w-[312px] max-w-[531px] h-fit flex flex-col justify-center items-center mx-1">
        <div className="flex flex-col items-center gap-6 px-5 mt-10 mx-4">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-brown-70 text-[24px]">
              이메일로 전송된
            </p>
            <p className="font-bold text-brown-70  text-[28px] text-center break-keep leading-8">
              <span className="text-brown-90">인증 번호</span>를 입력해주세요.
            </p>
          </div>
          <SignModalInput type="code" register={register} />
        </div>

        <div className="flex gap-2 mt-6 mb-8">
          <CommonButton
            type="button"
            size="md"
            className="w-[96px] h-[52px] text-[24px] hover:scale-105 transition-transform"
            onCheck={handleCodeCheck}>
            완료
          </CommonButton>
          <CommonButton
            type="button"
            size="md"
            className="w-[96px] h-[52px] text-[24px] hover:scale-105 transition-transform"
            onClose={close}>
            취소
          </CommonButton>
        </div>
      </Modal>
    </ModalPortal>
  );
}
