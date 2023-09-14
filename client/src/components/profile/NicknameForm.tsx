'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { updateUserNickname } from '@/api/profile';

import useUserStore from '@/stores/userStore';
import useSignModalStore from '@/stores/signModalStore';

import TextInput from '../common/TextInput';
import CommonButton from '../common/CommonButton';

import { InputValues } from '@/types/common';

type Token = {
  token: string;
};

export default function NicknameForm({ token }: Token) {
  const { setDisplayName, displayName } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<InputValues>();

  const changeState = useSignModalStore((state) => state.changeState);

  const nickname = watch('nickname');

  useEffect(() => {
    setValue('nickname', displayName);
  }, [displayName]);

  const updateNickName = async () => {
    if (!nickname) return;

    await updateUserNickname(nickname, token);
    setDisplayName(nickname);

    reset();
    changeState('ChangeNicknameModal');
  };

  return (
    <form
      onSubmit={handleSubmit(updateNickName)}
      className="relative w-fit flex justify-center">
      <div className="w-fit flex justify-center max-[580px]:flex-col">
        <label
          htmlFor="nickname"
          className="text-[20px] text-brown-80 font-bold pt-2 pr-2.5 ml-[68px] max-[580px]:ml-0 max-[580px]:p-0 max-[580px]:pb-3">
          닉네임 :
        </label>
        <div className="flex">
          <TextInput
            id="nickname"
            name="nickname"
            register={register}
            errors={errors}
            className="w-[244px] max-[420px]:w-[200px]"
          />
          <div className="mt-[2px]">
            <CommonButton
              type="submit"
              size="sm"
              className="w-[52px] h-8 ml-2 hover:scale-110 transition-transform">
              변경
            </CommonButton>
          </div>
        </div>
      </div>
    </form>
  );
}
