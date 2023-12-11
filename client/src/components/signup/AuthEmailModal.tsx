'use client';

import { useForm } from 'react-hook-form';

import useModalStore from '@/stores/modalStore';
import useSignStore from '@/stores/signStore';

import { SignModalInput } from '../sign';
import { CommonButton, Modal } from '../common';

import { SignFormValue } from '@/types/common';

export default function AuthEmailModal() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignFormValue>();

  const { close, changeType } = useModalStore();
  const { code, setIsCode } = useSignStore();

  const userCode = watch('code');

  const handleCodeCheck = () => {
    if (!userCode) return;

    if (userCode === code) {
      return setIsCode(true), close();
    }

    return changeType('FailureModal');
  };

  return (
    <Modal className="w-full min-w-[312px] max-w-[460px] h-fit flex flex-col justify-center items-center max-[480px]:max-w-[312px]">
      <form
        onSubmit={handleSubmit(handleCodeCheck)}
        className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-6 px-5 mt-10 mx-4">
          <div className="flex flex-col items-center gap-2">
            <p className="font-bold text-brown-70 text-[24px]">
              이메일로 전송된
            </p>
            <p className="font-bold text-brown-70  text-[28px] text-center break-keep leading-8">
              <span className="text-brown-90">인증 번호</span>를 입력해주세요.
            </p>
            <p className="mt-2 font-bold text-red-50 text-sm text-center break-keep leading-5">
              메일이 도착하지 않았다면
              <br />
              스팸 메일함을 확인해주세요!
            </p>
          </div>

          <SignModalInput type="code" register={register} errors={errors} />
        </div>

        <div className="flex gap-2 mt-6 mb-8">
          <CommonButton
            type="submit"
            size="md"
            className="w-[88px] h-[52px] text-[24px]"
            disabled={isSubmitting}>
            완료
          </CommonButton>

          <CommonButton
            type="button"
            size="md"
            className="w-[88px] h-[52px] text-[24px]"
            onClose={close}>
            취소
          </CommonButton>
        </div>
      </form>
    </Modal>
  );
}
