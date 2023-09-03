'use client';

import { useForm } from 'react-hook-form';

import { InputValues } from '@/types/common';

import CommonButton from '@/components/common/CommonButton';
import ImageInput from '@/components/common/ImageInput';
import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import TextArea from '@/components/common/TextArea';
import TextInput from '@/components/common/TextInput';

export default function AddLeaf() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<InputValues>();
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[600px] border-gradient">
        <Screws />
        <div className="pt-5 pb-6 h-full">
          <div className="w-full h-full flex flex-col items-center overflow-y-scroll scrollbar">
            <PageTitle text="식물 카드 등록" className="mb-5" />
            <ImageInput content="post" />
            <CommonButton
              usage="submit"
              size="sm"
              className="mt-3 mb-3 leading-4">
              이미지 등록
            </CommonButton>
            <p className="text-xs leading-3 font-normal text-gray-70 mb-6">
              2mb 이하의 이미지만 등록이 가능합니다.
            </p>
            <form
              onSubmit={handleSubmit((data) => console.log(data))}
              className="w-full">
              <div className="w-full flex justify-center gap-2 mb-1">
                <label className="pt-2 text-xl leading-5 text-brown-80 font-bold">
                  이름 :
                </label>
                <TextInput
                  name="plantName"
                  register={register}
                  errors={errors}
                  required
                />
              </div>
              <div className="w-full flex justify-center gap-2 mb-3">
                <label className="pt-2 text-xl leading-5 text-brown-80 font-bold">
                  설명 :
                </label>
                <TextArea
                  name="leafContent"
                  register={register}
                  errors={errors}
                  required
                />
              </div>
              <div className="flex justify-center gap-2">
                <CommonButton usage="submit" size="sm">
                  완료
                </CommonButton>
                <CommonButton usage="button" size="sm">
                  취소
                </CommonButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
