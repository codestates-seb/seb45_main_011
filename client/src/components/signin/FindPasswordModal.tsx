'use client';

import { useForm } from 'react-hook-form';

import { getUsersEmail, sendTemporaryPasswordByEmail } from '@/api/user';

import useSignModalStore from '@/stores/signModalStore';

import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';
import SignModalInput from '../sign/SignModalInput';
import CommonButton from '../common/CommonButton';

import { SignFormValue, UserData } from '@/types/common';

export default function FindPasswordModal() {
  const {
    register,
    watch,
    formState: { isSubmitting },
  } = useForm<SignFormValue>();
  const { close, changeState } = useSignModalStore();

  const userEmail = watch('email');

  const postNewPassword = async (email: string) => {
    if (!email) return;

    await sendTemporaryPasswordByEmail(email);
  };

  const handleEmailCheck = async (email: string) => {
    if (!userEmail) return;

    const response = await getUsersEmail();

    const existEmail = response?.data.data.find(
      (current: UserData) => current.email === userEmail,
    );

    if (!existEmail) return changeState('FailureModal');

    postNewPassword(email);
    return changeState('SuccessedModal');
  };

  return (
    <ModalPortal>
      <Modal className="w-full min-w-[312px] max-w-[531px] h-fit flex flex-col justify-center items-center mx-1">
        <div className="flex flex-col items-center gap-6 px-5 mt-10 mx-4">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-brown-70 text-[24px] text-center break-keep leading-8">
              가입하셨던 이메일을 입력해주시면
            </p>
            <p className="font-bold text-brown-70 text-[28px] text-center break-keep leading-8">
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
            className="w-[96px] h-[52px] text-[24px] mb-8 hover:scale-105 transition-transform"
            disabled={isSubmitting}
            onCheck={() => {
              handleEmailCheck(userEmail);
            }}>
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
