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
