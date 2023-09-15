import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import useAddLeafMutaion from '@/hooks/useAddLeafMutaion';
import useEditLeafMutaion from '@/hooks/useEditLeafMutation';

import TextInput from './TextInput';
import ImageUpload from './ImageUpload';
import CommonButton from './CommonButton';
import TextArea from './TextArea';

import { InputValues } from '@/types/common';
import { LeafDataInfo } from '@/types/data';

interface LeafFormProps {
  leaf?: LeafDataInfo | null;
  leafId?: string;
  mode: 'add' | 'edit';
  userId: string;
}

export default function LeafForm({
  leaf,
  leafId,
  mode,
  userId,
}: LeafFormProps) {
  const router = useRouter();

  useEffect(() => {
    if (leaf) {
      setValue('plantName', leaf?.leafName);
      setValue('leafContent', leaf?.content);
    }
  }, [leaf]);

  const [isImageUpdated, setIsImageUpdated] = useState(false);

  const { mutate } =
    mode === 'add'
      ? useAddLeafMutaion()
      : useEditLeafMutaion({ leafId: leafId as string, isImageUpdated });

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
  } = useForm<InputValues>();

  const submitLeaf = (inputs: InputValues) => {
    mutate(inputs);
  };

  const cancelEdit = () => router.push(`/leafs/${userId}`);

  return (
    <form onSubmit={handleSubmit(submitLeaf)} className="w-full">
      <div className="w-full flex flex-col items-center gap-2 mb-1">
        <ImageUpload
          required={mode === 'add'}
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          setValue={setValue}
          imageUrl={leaf?.leafImageUrl}
          setIsImageUpdated={setIsImageUpdated}
        />
        <div className="w-full flex justify-center gap-2">
          <label className="pt-2 text-xl leading-5 text-brown-80 font-bold whitespace-nowrap">
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
          <label className="pt-2 text-xl leading-5 text-brown-80 font-bold whitespace-nowrap">
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
      <div className="flex justify-center gap-2 mb-2">
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
