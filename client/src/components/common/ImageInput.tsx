'use client';

import { useRef, useState } from 'react';

import { updateUserProfileImage } from '@/api/profile';

import usePesistStore from '@/stores/persistStore';

import CommonButton from './CommonButton';

type Token = {
  token: string;
};

export default function ImageInput({ token }: Token) {
  const { isGoogleLogin, isLogin, profileImageUrl, setProfileImageUrl } =
    usePesistStore();

  const [image, setImage] = useState<FileList>();
  const imageUploadRef = useRef<HTMLInputElement | null>(null);

  const checkFileSize = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      if (file.size <= 2 * 1024 * 1024) {
        return true;
      }
    }

    alert('2mb 이하의 이미지만 등록이 가능합니다.');
    return false;
  };

  const profileImage = () => {
    if (!profileImageUrl) return '/assets/img/profile_avocado.png';

    if (isLogin || isGoogleLogin) {
      return profileImageUrl;
    }
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (!file) return;

    if (file[0] && checkFileSize(file[0])) {
      setImage(file);
      console.log(file[0]);

      const newFileURL = URL.createObjectURL(file[0]);
      setProfileImageUrl(newFileURL);
    }
  };

  const onImageSubmit = () => {
    if (image && token) {
      updateUserProfileImage(image[0], token);
    }
  };

  return (
    <form>
      <div className="flex flex-col items-center justify-center">
        <img
          src={profileImage()}
          className="w-[100px] h-[100px] rounded-[50%] border-brown-50 border-[3px] cursor-pointer mb-4"
          alt="profile_img"
          onClick={() => imageUploadRef.current?.click()}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imageUploadRef}
          onChange={onImageChange}
        />
        <CommonButton
          type="submit"
          size="sm"
          children="이미지 등록"
          className="w-[100px] h-8 mb-3"
          onSubmit={onImageSubmit}
        />
        <p className="text-gray-70 text-xs mb-8">
          2mb 이하의 이미지만 등록이 가능합니다.
        </p>
      </div>
    </form>
  );
}
