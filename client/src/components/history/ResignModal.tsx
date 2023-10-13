'use client';

import { useForm } from 'react-hook-form';

import { postUserPassword } from '@/api/history';

import useUserStore from '@/stores/userStore';
import useModalStore from '@/stores/modalStore';

import { SignModalInput } from '../sign';
import { CommonButton, Modal, ModalPortal } from '../common';

import { SignFormValue } from '@/types/common';

export default function ResignModal() {
  const {
    register,
    watch,
    formState: { isSubmitting },
  } = useForm<SignFormValue>();

  const { setAccessToken } = useUserStore();
  const { close, changeType } = useModalStore();

  const userPassword = watch('password');

  const handlePasswordCheck = async () => {
    if (!userPassword) return;

    const response = await postUserPassword(userPassword);

    if (response.data.data) {
      return (
        changeType('ConfirmModal'),
        setAccessToken(response.headers?.authorization)
      );
    }

    return changeType('FailureModal');
  };

  return (
    <ModalPortal>
      <Modal className="min-w-[312px] h-fit flex flex-col justify-center items-center mx-1">
        <section className="flex flex-col items-center gap-4 px-5 mt-10 mx-4">
          <div className="flex flex-col items-center leading-8 text-[22px] max-[705px]:text-[18px]">
            <p className="font-bold text-brown-70 text-center break-keep  ">
              탈퇴하시려면
            </p>
            <div className="flex flex-col items-center font-bold text-brown-70 ">
              <p className="font-bold text-brown-80 text-center break-keep leading-8 ">
                가입 시 등록하셨던
              </p>
              <div className="font-bold text-brown-80 text-center break-keep leading-8 ">
                비밀번호
                <span className="text-brown-70 ">를 입력해주세요.</span>
              </div>
            </div>
          </div>

          <SignModalInput type="password" register={register} />
        </section>

        <div className="flex gap-4 mt-6 mb-6">
          <CommonButton
            type="button"
            size="sm"
            className="py-2 px-4 text-[20px]"
            disabled={isSubmitting}
            onCheck={handlePasswordCheck}>
            완료
          </CommonButton>

          <CommonButton
            type="button"
            size="sm"
            className="py-2 px-4 text-[20px]"
            onClose={close}>
            취소
          </CommonButton>
        </div>
      </Modal>
    </ModalPortal>
  );
}
