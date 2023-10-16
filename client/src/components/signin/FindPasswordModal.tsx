'use client';

import { useForm } from 'react-hook-form';

import useFindPassword from '@/hooks/useFindPassword';

import { SignModalInput } from '../sign';
import { CommonButton, Modal, ModalPortal } from '../common';

import { SignFormValue } from '@/types/common';

export default function FindPasswordModal() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignFormValue>();

  const { onEmailCheck, close } = useFindPassword();

  const userEmail = watch('email');

  return (
    <ModalPortal>
      <Modal className="w-full min-w-[312px] max-w-[531px] h-fit flex flex-col justify-center items-center max-[572px]:max-w-[448px] max-[480px]:max-w-[312px]">
        <form
          onSubmit={handleSubmit(() => onEmailCheck(userEmail))}
          className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 px-5 mt-10">
            <div className="flex flex-col items-center gap-1">
              <p className="font-bold text-brown-70 text-[24px] text-center break-keep leading-8">
                가입하셨던 이메일로
              </p>
              <p className="font-bold text-brown-70 text-[28px] text-center break-keep leading-8">
                <span className="text-brown-90">임시 비밀번호</span>를
                발송해드립니다.
              </p>
            </div>

            <SignModalInput type="email" register={register} errors={errors} />
          </div>

          <div className="flex gap-2">
            <CommonButton
              type="submit"
              size="md"
              className="w-[88px] h-[52px] text-[24px] mb-8"
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
    </ModalPortal>
  );
}
