'use client';

import Image from 'next/image';

import useClient from '@/hooks/useClient';
import useChangeImage from '@/hooks/useChangeImage';

import { CommonButton } from '../common';

import { DefaultProps } from '@/types/common';

export default function ImageForm({ className }: DefaultProps) {
  const isClient = useClient();
  const {
    imageUploadRef,
    imageUrl,
    isDisabled,

    onImageChange,
    onImageSubmit,
  } = useChangeImage();

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
