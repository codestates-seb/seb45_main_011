'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import { updateUserProfileImage } from '@/api/profile';

import useUserStore from '@/stores/userStore';

import useClient from '@/hooks/useClient';

import CommonButton from '../common/CommonButton';

import { DefaultProps } from '@/types/common';

export default function ImageForm({ className }: DefaultProps) {
  const isClient = useClient();

  const { profileImageUrl, setProfileImageUrl, setAccessToken } =
    useUserStore();

  const [image, setImage] = useState<FileList>();
  const [imageUrl, setImageUrl] = useState(profileImageUrl);
  const [isDisabled, setIsDisabled] = useState(true);

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

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (!file) return;

    if (file[0] && checkFileSize(file[0])) {
      setImage(file);

      const newFileURL = URL.createObjectURL(file[0]);
      setImageUrl(newFileURL);
      setIsDisabled(false);
    }
  };

  const onImageSubmit = async () => {
    if (image && !isDisabled) {
      const response = await updateUserProfileImage(image[0]);

      setProfileImageUrl(imageUrl);
      setIsDisabled(true);

      if (response.status === 204) {
        setAccessToken(response.headers?.authorization);
      }
    }
  };

  return (
    <>
      {isClient && (
        <form className={className}>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={imageUrl || '/assets/img/bg_default_profile.png'}
              className="w-[100px] h-[100px] rounded-[50%] border-brown-50 border-[3px] bg-brown-20 cursor-pointer mb-4 shadow-outer/down object-cover"
              alt="profile_img"
              width={100}
              height={100}
              priority
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
              className="w-[100px] h-8 mb-3"
              onSubmit={onImageSubmit}
              disabled={isDisabled}>
              이미지 등록
            </CommonButton>
            <p className="text-gray-70 text-xs mb-8">
              2mb 이하의 이미지만 등록이 가능합니다.
            </p>
          </div>
        </form>
      )}
    </>
  );
}
