'use client';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import CommonButton from '@/components/common/CommonButton';
import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import TextArea from '@/components/common/TextArea';
import TextInput from '@/components/common/TextInput';
import ImageUpload from '@/components/common/ImageUpload';

import { editLeaf, getLeaf } from '@/api/LeafAPI';

import { InputValues } from '@/types/common';
import { LeafDataInfo } from '@/types/data';

interface EditLeafProps {
  params: { userId: string; leafId: string };
}
export default function EditLeaf({ params }: EditLeafProps) {
  const leafId = Number(params.leafId);
  const userId = Number(params.userId);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: leaf,
    isLoading,
    isError,
  } = useQuery<LeafDataInfo>({
    queryKey: ['leaf'],
    queryFn: () => getLeaf(leafId),
  });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  // mutate 함수는 UI상 변화는 x
  const { mutate } = useMutation({
    mutationFn: editLeaf,
    // mutate가 성공하면 리다이렉트
    onSuccess: () => {
      router.push(`/leafs/${userId}`);
      // 성공 후 새로운 쿼리를 다시 가져올 수 있도록 캐시 무효화
      queryClient.invalidateQueries(['leafs']);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
  } = useForm<InputValues>({
    defaultValues: {
      plantName: leaf?.leafName,
      leafContent: leaf?.content,
    },
  });

  const submitEditLeaf = (leaf: InputValues) => {
    mutate({ leaf, leafId });
  };

  const cancelEdit = () => router.push(`/leafs/{userId}`);

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[600px] border-gradient">
        <Screws />
        <div className="p-5 h-full">
          <div className="w-full h-full flex flex-col items-center overflow-y-scroll scrollbar">
            <PageTitle text="식물 카드 수정" className="mb-5" />
            <form onSubmit={handleSubmit(submitEditLeaf)} className="w-full">
              <div className="w-full flex flex-col items-center gap-2 mb-1">
                <ImageUpload
                  register={register}
                  errors={errors}
                  clearErrors={clearErrors}
                  setValue={setValue}
                  imageUrl={leaf?.imageUrl}
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
                <CommonButton type="button" size="sm" onClick={cancelEdit}>
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
