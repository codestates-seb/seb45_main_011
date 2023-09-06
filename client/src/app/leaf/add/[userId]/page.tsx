'use client';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import CommonButton from '@/components/common/CommonButton';
import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import TextArea from '@/components/common/TextArea';
import TextInput from '@/components/common/TextInput';
import ImageUpload from '@/components/common/ImageUpload';

import { InputValues } from '@/types/common';

import { addLeaf } from '@/api/LeafAPI';

interface AddLeafProps {
  params: { leafId: string; userId: string };
}

export default function AddLeaf({ params }: AddLeafProps) {
  const userId = Number(params.userId);

  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
  } = useForm<InputValues>();

  // mutate 함수는 UI상 변화는 x
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: addLeaf,
    // mutate가 성공하면 리다이렉트
    onSuccess: () => {
      router.push(`/leafs/${userId}`);
      // 성공 후 새로운 쿼리를 다시 가져올 수 있도록 캐시 무효화
      queryClient.invalidateQueries(['leafs']);
    },
  });

  // 여러가지 방식이라 구별할때는 click
  const handleCancel = () => router.push(`/leafs/${userId}`);

  const handleSubmitAddLeaf = (data: InputValues) => {
    console.log(data);
    mutate(data);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[600px] border-gradient">
        <Screws />
        <div className="p-5 h-full">
          <div className="w-full h-full flex flex-col overflow-y-scroll scrollbar">
            <PageTitle text="식물 카드 등록" className="mb-5" />

            <form
              onSubmit={handleSubmit(handleSubmitAddLeaf)}
              className="w-full">
              <div className="w-full flex flex-col">
                <ImageUpload
                  required
                  register={register}
                  errors={errors}
                  clearErrors={clearErrors}
                  setValue={setValue}
                />
                <div className="w-full flex justify-center gap-2 mb-3">
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
              </div>

              <div className="flex justify-center gap-2">
                <CommonButton type="submit" size="sm">
                  완료
                </CommonButton>
                <CommonButton
                  type="button"
                  size="sm"
                  // onCancel -> 자식 컴포넌트로 전달할때는 관습이다.
                  onClick={handleCancel}>
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
