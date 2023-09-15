import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ImageUpload from '../common/ImageUpload';
import PageTitle from '../common/PageTitle';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import CommonButton from '../common/CommonButton';

import useLeafStore from '@/stores/leafStore';

import { addDiary, editDiary } from '@/api/leaf';

import { InputValues } from '@/types/common';

interface DiaryFormProps {
  imageUrl?: string;
  content?: string;
  title?: string;
  leafId: string;
  diaryId?: string | null;
  userId: string;
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
  const queryClient = useQueryClient();

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

  const { mutate } = useMutation({
    mutationFn:
      mode === 'edit'
        ? (inputs: InputValues) =>
            editDiary({ diaryId, inputs, userId, isImageUpdated })
        : (inputs: InputValues) =>
            addDiary({ leafId, inputs, isImageUpdated, userId }),

    onSuccess: () => {
      queryClient.invalidateQueries(['diaries', leafId]);
    },
  });

  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const modalClose = useLeafStore((state) => state.modalClose);

  const handleSubmitDiary = (inputs: InputValues) => {
    mutate(inputs);
    modalClose();
  };

  const handleModalCancel = () => modalClose();

  return (
    <div className="w-[440px] max-w-[500px] h-[550px] px-[1.5rem] py-[1rem] items-center flex flex-col max-[480px]:w-[320px]">
      <PageTitle text="일지 작성하기" className="mt-5 mb-6" />
      <form
        onSubmit={handleSubmit(handleSubmitDiary)}
        className="w-full overflow-y-scroll scrollbar">
        <div className="w-full flex flex-col">
          <ImageUpload
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            setValue={setValue}
            imageUrl={imageUrl}
            setIsImageUpdated={setIsImageUpdated}
          />
          <div className="w-full flex justify-center gap-2 mb-3 pr-6">
            <label
              htmlFor="title"
              className="min-w-[55px] pt-2 text-xl leading-5 text-brown-80 font-bold max-[480px]:text-lg max-[480px]:pt-1 max-[480px]:min-w-[48px]">
              제목 :{' '}
            </label>
            <TextInput
              id="title"
              name="title"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="w-full flex justify-center gap-2 mb-1 pr-6">
            <label
              htmlFor="diary-content"
              className="min-w-[55px] pt-2 text-xl leading-5 text-brown-80 font-bold max-[480px]:text-lg max-[480px]:pt-1 max-[480px]:min-w-[48px]">
              내용 :{' '}
            </label>
            <TextArea
              id="diary-content"
              name="diaryContent"
              register={register}
              errors={errors}
              required
            />
          </div>
        </div>

        {/* 게시글로도 추가하기 
        <div className="mb-[1.625rem] flex justify-center items-center gap-2 ">
          <p className="text-center font-bold text-xl leading-5 text-brown-80">
            게시글로도 작성하기
          </p>
          <label htmlFor="is-board" className="cursor-pointer">
            <input
              id={'is-board'}
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
                  src="/assets/icon/checked.svg"
                  alt=""></img>
              ) : null}
            </div>
          </label>
        </div> */}

        <div className="flex justify-center gap-2 mb-2">
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
