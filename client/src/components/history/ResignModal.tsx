'use client';

import { useForm } from 'react-hook-form';

import useResignCheckMutation from '@/hooks/mutation/useResignCheckMutation';

import { SignModalInput } from '../sign';
import { CommonButton, Modal } from '../common';

import { SignFormValue } from '@/types/common';

export default function ResignModal() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignFormValue>();

  const { mutate: onPasswordCheck, close } = useResignCheckMutation();

  const userPassword = watch('password');

  return (
    <Modal className="min-w-[312px] h-fit flex flex-col justify-center items-center mx-1">
      <form
        onSubmit={handleSubmit(() => onPasswordCheck(userPassword))}
        className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 px-5 mt-10 mx-4">
          <div className="flex flex-col items-center leading-8 text-[22px] max-[705px]:text-[18px]">
            <p className="font-bold text-brown-70 text-center break-keep">
              탈퇴하시려면
            </p>
            <div className="flex flex-col items-center font-bold text-brown-70 ">
              <p className="font-bold text-brown-80 text-center break-keep leading-8">
                가입 시 등록하셨던
              </p>
              <div className="font-bold text-brown-80 text-center break-keep leading-8">
                비밀번호
                <span className="text-brown-70">를 입력해주세요.</span>
              </div>
            </div>
          </div>

          <SignModalInput type="password" register={register} errors={errors} />
        </div>

        <div className="flex gap-4 mt-1 mb-6">
          <CommonButton
            type="submit"
            size="sm"
            className="py-2 px-4 text-[20px]"
            disabled={isSubmitting}>
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
      </form>
    </Modal>
  );
}
