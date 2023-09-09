import React, { Dispatch, useRef, useState } from 'react';

import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import NoImage from './NoImage';
import CommonButton from './CommonButton';
import Preview from './Preview';

import { InputValues } from '@/types/common';

import isValidFileSize from '@/utils/isValidFileSize';

interface ImageUploadProps {
  register: UseFormRegister<InputValues>;
  errors: FieldErrors<InputValues>;
  required?: boolean;
  clearErrors: UseFormClearErrors<InputValues>;
  setValue: UseFormSetValue<InputValues>;
  imageUrl?: string;
  setIsImageUpdated?: Dispatch<boolean>;
}

function ImageUpload({
  register,
  required,
  errors,
  clearErrors,
  setValue,
  imageUrl,
  setIsImageUpdated,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    imageUrl,
  );

  // 이미지 미리보기 설정하는 함수
  const setPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setIsImageUpdated && setIsImageUpdated(true);

      const file = e.target.files;

      if (isValidFileSize(file[0])) {
        setImagePreview(URL.createObjectURL(file[0]));
        clearErrors('image');
        setValue('image', file);
        return;
      }

      alert('2mb 이하 이미지를 선택해주세요.');
    }
    return;
  };

  const handleImageUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {imagePreview ? (
        <Preview src={imagePreview} />
      ) : (
        <NoImage location="imageUpload" />
      )}
      <input
        className="hidden"
        {...register(
          'image',
          required
            ? {
                required: '이미지를 필수로 등록해야 합니다.',
              }
            : {},
        )}
        ref={(event) => {
          inputRef.current = event;
        }}
        type="file"
        accept="image/*"
        onChange={(event) => setPreview(event)}
      />
      <label htmlFor="image">
        <CommonButton
          type="button"
          size="sm"
          className="mt-3 mb-3 leading-4"
          onClick={handleImageUpload}>
          이미지 등록
        </CommonButton>
      </label>
      {Object.keys(errors).length ? (
        <p className="text-xs leading-3 font-normal text-red-50 mb-5">
          {errors?.image?.message}
        </p>
      ) : (
        <p className="text-xs leading-3 font-normal text-gray-70 mb-5">
          2mb 이하의 이미지만 등록이 가능합니다.
        </p>
      )}
    </div>
  );
}

export default ImageUpload;
