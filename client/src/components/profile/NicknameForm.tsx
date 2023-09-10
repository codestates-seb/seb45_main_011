'use client';

import { useForm } from 'react-hook-form';

import { updateUserNickname } from '@/api/profile';

import usePesistStore from '@/stores/persistStore';

import TextInput from '../common/TextInput';
import CommonButton from '../common/CommonButton';

import { InputValues } from '@/types/common';

type Token = {
  token: string;
};

export default function NicknameForm({ token }: Token) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<InputValues>();

  const nickname = watch('nickname');

  const updateNickName = () => {
    if (!nickname) return;

    try {
      updateUserNickname(nickname, token);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateNickName)}
      className="relative w-full flex justify-center ml-2">
      <div className="w-full flex justify-center ml-2">
        <div className="flex justify-center">
          <label className="text-[20px] text-brown-80 font-bold pt-2">
            닉네임 :&nbsp;
          </label>
        </div>
        <TextInput name="nickname" register={register} errors={errors} />
        <div className="mt-[2px]">
          <CommonButton
            type="submit"
            size="sm"
            children="변경"
            className="w-[52px] h-8 ml-2"
          />
        </div>
      </div>
    </form>
  );
}
