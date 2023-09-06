'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import CommonButton from '@/components/common/CommonButton';
import PageTitle from '@/components/common/PageTitle';
import Screws from '@/components/common/Screws';
import TextArea from '@/components/common/TextArea';
import TextInput from '@/components/common/TextInput';
import ImageUpload from '@/components/common/ImageUpload';
import leafs from '@/mock/leaf.json';

import { InputValues } from '@/types/common';
import { editLeaf } from '@/api/LeafAPI';
export default function EditLeaf({
  params,
}: {
  // 형 변환은 서버로 데이터 받을때
  params: { userId: string; leafId: string };
}) {
  const { userId, leafId } = params;
  const router = useRouter();
  // 타입을 api랑 미리 맞추거나 아니면 타입을 비교안하는 방식 (==) 등으로 처리한다.
  const leaf = leafs.find((leafInfo) => leafInfo.leafId == parseInt(leafId));
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

  const handleSubmitEditLeaf = (leafs: InputValues) => {
    editLeaf(leafs, leafId);
    console.log(leafs);
  };
  const handleCancelClick = () => router.push(`/leafs/{userId}`);
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-[720px] h-[600px] border-gradient">
        <Screws />
        <div className="p-5 h-full">
          <div className="w-full h-full flex flex-col items-center overflow-y-scroll scrollbar">
            <PageTitle text="식물 카드 수정" className="mb-5" />

            <form
              onSubmit={handleSubmit(handleSubmitEditLeaf)}
              className="w-full">
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
                <CommonButton
                  type="button"
                  size="sm"
                  onClick={handleCancelClick}>
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
