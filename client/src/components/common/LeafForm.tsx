import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import TextInput from './TextInput';
import ImageUpload from './ImageUpload';
import CommonButton from './CommonButton';
import TextArea from './TextArea';

import { InputValues } from '@/types/common';
import { LeafDataInfo } from '@/types/data';

import { addLeaf, editLeaf } from '@/api/LeafAPI';

interface LeafFormProps {
  leaf?: LeafDataInfo;
  leafId?: number;
  mode: 'add' | 'edit';
  userId: number;
}

export default function LeafForm({
  leaf,
  leafId,
  mode,
  userId,
}: LeafFormProps) {
  const queryClient = useQueryClient();

  const router = useRouter();

  useEffect(() => {
    if (leaf) {
      setValue('plantName', leaf?.leafName);
      setValue('leafContent', leaf?.content);
    }
  }, [leaf]);

  const { mutate } = useMutation({
    mutationFn:
      mode === 'add'
        ? (inputs: InputValues) => addLeaf(inputs)
        : (inputs: InputValues) => editLeaf({ inputs, leafId, isImageUpdated }),
    onSuccess: () => {
      router.push(`/leafs/${userId}`);
      queryClient.invalidateQueries(['leafs']);
    },
  });
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
  } = useForm<InputValues>();
  const submitEditLeaf = (inputs: InputValues) => {
    mutate(inputs);
  };

  const cancelEdit = () => router.push(`/leafs/{userId}`);
  return (
    <form onSubmit={handleSubmit(submitEditLeaf)} className="w-full">
      <div className="w-full flex flex-col items-center gap-2 mb-1">
        <ImageUpload
          required={true}
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          setValue={setValue}
          imageUrl={leaf?.leafImageUrl}
          setIsImageUpdated={setIsImageUpdated}
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
  );
}
