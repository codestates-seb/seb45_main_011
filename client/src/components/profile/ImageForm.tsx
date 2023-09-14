'use client';

import { useRef, useState } from 'react';

import { updateUserProfileImage } from '@/api/profile';

import useUserStore from '@/stores/userStore';

import useClient from '@/hooks/useClient';

import CommonButton from '../common/CommonButton';

import { DefaultProps } from '@/types/common';

interface ImageFormProps extends DefaultProps {
  token: string;
}

export default function ImageForm({ token, className }: ImageFormProps) {
  const isClient = useClient();
  const { profileImageUrl, setProfileImageUrl } = useUserStore();

  const [image, setImage] = useState<FileList>();
  const [imageUrl, setImageUrl] = useState(profileImageUrl);

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
    }
  };

  const onImageSubmit = () => {
    if (image && token) {
      updateUserProfileImage(image[0], token);
      setProfileImageUrl(imageUrl);
    }
  };

  return (
    <>
      {isClient && (
        <form>
          <div className="flex flex-col items-center justify-center">
            <img
              src={imageUrl || '/assets/img/bg_default_profile.png'}
              className="w-[100px] h-[100px] rounded-[50%] border-brown-50 border-[3px] cursor-pointer mb-4 shadow-outer/down"
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
      )}
    </>
  );
}
