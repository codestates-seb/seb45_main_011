'use client';

import { useForm } from 'react-hook-form';

import { updateUserNickname } from '@/api/profile';

import useUserStore from '@/stores/userStore';

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
  } = useForm<InputValues>({
    defaultValues: {
      nickname: displayName,
    },
  });

  const nickname = watch('nickname');

  const updateNickName = () => {
    if (!nickname) return;

    try {
      updateUserNickname(nickname, token);
      setDisplayName(nickname);
      reset();
      alert('닉네임이 성공적으로 변경되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateNickName)}
      className="relative w-fit flex justify-center">
      <div className="w-fit flex justify-center max-[580px]:flex-col">
        <label className="text-[20px] text-brown-80 font-bold pt-2 pr-2.5 ml-[68px] max-[580px]:ml-0 max-[580px]:p-0 max-[580px]:pb-3">
          닉네임 :
        </label>
        <div className="flex">
          <TextInput
            name="nickname"
            register={register}
            errors={errors}
            className="w-[244px] max-[420px]:w-[200px]"
          />
          <div className="mt-[2px]">
            <CommonButton
              type="submit"
              size="sm"
              children="변경"
              className="w-[52px] h-8 ml-2"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
