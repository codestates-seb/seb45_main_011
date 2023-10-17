import React, { Dispatch, useRef, useState } from 'react';

import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { NoImage, CommonButton, Preview } from '@/components/common';

import { InputValues } from '@/types/common';

import { IMAGE_UPLOAD_TEXT } from '@/constants/contents';

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

      alert(IMAGE_UPLOAD_TEXT.fileSizeWarn);
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
                required: IMAGE_UPLOAD_TEXT.noImageUploadError,
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
          {IMAGE_UPLOAD_TEXT.imageUpload}
        </CommonButton>
      </label>
      {Object.keys(errors).length ? (
        <p className="text-xs leading-3 font-normal text-red-50 mb-5">
          {errors?.image?.message}
        </p>
      ) : (
        <p className="text-xs leading-3 font-normal text-gray-70 mb-5">
          {IMAGE_UPLOAD_TEXT.noImageUploadError}
        </p>
      )}
    </div>
  );
}

export default ImageUpload;
