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
      <Modal className="w-full min-w-[312px] max-w-[531px] h-fit flex flex-col justify-center items-center shadow-container">
        <div className="flex flex-col items-center gap-6 px-5 mt-10 mx-4">
          <div className="flex flex-col items-center gap-2">
            <p className="font-bold text-brown-70 max-[360px]:text-[24px] text-center break-keep leading-8 text-[30px]">
              탈퇴하시려면
            </p>
            <div className="flex flex-col items-center gap-2 font-bold text-brown-70 max-[360px]:text-[28px] text-[30px]">
              <p className="font-bold text-brown-80 max-[360px]:text-[24px] text-center break-keep leading-8 text-[30px]">
                가입 시 등록하셨던
              </p>
              <div className="font-bold text-brown-80 max-[360px]:text-[24px] text-center break-keep leading-8 text-[30px]">
                비밀번호
                <span className="text-brown-70 max-[360px]:text-[22px] text-[30px]">
                  를 입력해주세요.
                </span>
              </div>
            </div>
          </div>
          <SignModalInput type="password" register={register} />
        </div>
        <div className="flex gap-2 mt-6 mb-6">
          <CommonButton
            type="button"
            size="md"
            className="w-[96px] h-[52px] text-[24px] hover:scale-105 transition-transform"
            onCheck={handlePasswordCheck}>
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
