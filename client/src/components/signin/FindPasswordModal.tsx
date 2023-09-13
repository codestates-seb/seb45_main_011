'use client';

import { useForm } from 'react-hook-form';

import { getUsersEmail, postPasswordByEmail } from '@/api/user';

import useSignModalStore from '@/stores/signModalStore';

import Modal from '../common/Modal';
import ModalPortal from '../common/ModalPortal';
import SignModalInput from '../sign/SignModalInput';
import CommonButton from '../common/CommonButton';

import { SignFormValue } from '@/types/common';

export default function FindPasswordModal() {
  const { register, watch } = useForm<SignFormValue>();
  const { close, changeState } = useSignModalStore();

  const userEmail = watch('email');

  const postNewPassword = async (email: string) => {
    if (!email) return;

    // try, catch 필요없다, sendTemporaryPassword로 변경해주기
    // 이름 작성이 힘들다면 혹은 애초에 사용할 때 한글로 이름 짓기 -> 확정이 되면 영어로 변경하기
    await postPasswordByEmail(email);
  };

  const handleEmailCheck = async (email: string) => {
    if (!userEmail) return;

    const response = await getUsersEmail();

    // response를 보고 타입 고쳐놓기
    const existEmail = response?.data.data.find(
      (current: any) => current.email === userEmail,
    );

    if (userEmail === existEmail.email) {
      postNewPassword(email);
      return changeState('SuccessedModal');
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
            onClose={close}
          />
        </div>
      </Modal>
    </ModalPortal>
  );
}
