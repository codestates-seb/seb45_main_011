import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import ImageUpload from './common/ImageUpload';
import PageTitle from './common/PageTitle';
import TextInput from './common/TextInput';
import TextArea from './common/TextArea';
import CommonButton from './common/CommonButton';

import useModalStore from '@/stores/modalStore';

import { addDiary, editDiary } from '@/api/LeafAPI';

import { InputValues } from '@/types/common';
import { useRouter } from 'next/navigation';

export interface DiaryFormProps {
  imageUrl?: string;
  content?: string;
  title?: string;
  leafId: number;
  diaryId?: number | null;
  userId: number;
  mode: 'add' | 'edit';
}
export default function DiaryForm({
  imageUrl,
  title,
  content,
  leafId,
  userId,
  diaryId,
  mode,
}: DiaryFormProps) {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: ({
      diaryId,
      leafId,
      diary,
      userId,
    }: {
      leafId: number;
      diaryId?: number | null;
      diary: InputValues;
      userId: number;
    }) =>
      mode === 'edit'
        ? editDiary({ diaryId, diary, userId })
        : addDiary({ leafId, diary }),
    // mutate가 성공하면 리다이렉트
    onSuccess: () => {
      router.push(`/leaf/${userId}/${leafId}`);
      // 성공 후 새로운 쿼리를 다시 가져올 수 있도록 캐시 무효화
      queryClient.invalidateQueries(['leaf']);
    },
  });

  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    setValue,
  } = useForm<InputValues>({
    defaultValues: {
      title,
      diaryContent: content,
    },
  });

  const [isChecked, setIsChecked] = useState(false);

  const setIsModalOpen = useModalStore((state) => state.setIsDiaryModalOpen);

  const handleSubmitDiary = (diary: InputValues) => {
    mutate({ leafId, diary, userId, diaryId });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col w-full items-center min-w-[531px] h-[698px] px-[3rem]">
      <PageTitle text="일지 작성하기" className="mt-5 mb-6" />
      <form onSubmit={handleSubmit(handleSubmitDiary)} className="w-full">
        <div className="w-full flex flex-col">
          <ImageUpload
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            setValue={setValue}
            imageUrl={imageUrl}
          />
          <div className="w-full flex justify-center gap-2 mb-3">
            <label className="pt-2 text-xl leading-5 text-brown-80 font-bold">
              제목 :{' '}
            </label>
            <TextInput
              name="title"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="w-full flex justify-center gap-2 mb-3">
            <label className="pt-2 text-xl leading-5 text-brown-80 font-bold">
              내용 :{' '}
            </label>
            <TextArea
              name="diaryContent"
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>
        <div className="mb-[1.625rem] flex justify-center items-center gap-2 ">
          <p className="text-center font-bold text-xl leading-5 text-brown-80">
            게시글로도 작성하기
          </p>
          <label className="cursor-pointer">
            <input
              {...register('isBoard')}
              className="hidden"
              type="checkbox"
            />
            <div
              className="w-[24px] h-[24px] bg-white-10 border-2 border-brown-70 rounded flex justify-center"
              onClick={() => setIsChecked((previous) => !previous)}>
              {isChecked ? (
                <img
                  className="w-[16px]"
                  src="/assets/img/checked.svg"
                  alt=""></img>
              ) : null}
            </div>
          </label>
        </div>

        <div className="flex justify-center gap-2">
          <CommonButton type="submit" size="sm">
            완료
          </CommonButton>
          <CommonButton type="button" size="sm" onClick={handleModalCancel}>
            취소
          </CommonButton>
        </div>
      </form>
    </div>
  );
}
