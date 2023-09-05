import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { DiaryInfo, InputValues } from '@/types/common';
import useModalStore from '@/stores/modalStore';

import ImageUpload from './common/ImageUpload';
import PageTitle from './common/PageTitle';
import TextInput from './common/TextInput';
import TextArea from './common/TextArea';
import CommonButton from './common/CommonButton';

interface DiaryFormProps {
  diary?: DiaryInfo | null;
}

export default function DiaryForm({ diary }: DiaryFormProps) {
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    setValue,
  } = useForm<InputValues>({
    defaultValues: {
      title: diary?.title,
      diaryContent: diary?.content,
    },
  });
  const [isChecked, setIsChecked] = useState(false);
  const setIsModalOpen = useModalStore((state) => state.setIsDiaryModalOpen);
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col w-full items-center min-w-[531px] h-[698px] px-[3rem]">
      <PageTitle text="일지 작성하기" className="mt-5 mb-6" />
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="w-full">
        <div className="w-full flex flex-col">
          <ImageUpload
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            setValue={setValue}
            imageUrl={diary?.imgUrl}
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
          <CommonButton usage="submit" size="sm">
            완료
          </CommonButton>
          <CommonButton
            usage="button"
            size="sm"
            handleModalCancel={handleModalCancel}>
            취소
          </CommonButton>
        </div>
      </form>
    </div>
  );
}
