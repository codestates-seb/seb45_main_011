'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { addPost, editPost } from '@/api/post';

import TextInput from '@/components/common/TextInput';
import ImageUpload from '@/components/common/ImageUpload';
import TextArea from '@/components/common/TextArea';
import TagInput from '@/components/common/TagInput';
import CommonButton from '@/components/common/CommonButton';

import { InputValues } from '@/types/common';
import { PostFormValues, RawPostInfo } from '@/types/data';
import useEffectOnce from '@/hooks/useEffectOnce';

interface AddPostParameters {
  formValues: PostFormValues;
  tags: string[];
}

interface EditPostParameters extends AddPostParameters {
  postId: string;
}

interface PostFormProps {
  post?: RawPostInfo;
  postId?: string;
  mode: 'add' | 'edit';
}

export default function PostForm({ post, postId, mode }: PostFormProps) {
  const router = useRouter();

  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const { mutate } = useMutation({
    mutationFn: ({ formValues, tags }: AddPostParameters) =>
      addPost(formValues, tags),
  });

  const editMutation = useMutation({
    mutationFn: ({ formValues, tags, postId }: EditPostParameters) =>
      editPost(formValues, tags, postId),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    resetField,
    setValue,
  } = useForm<InputValues>();

  const handleCancel = () => router.back();

  useEffectOnce(() => {
    if (post) {
      setValue('title', post.title);
      setValue('diaryContent', post.content);
    }
  });

  return (
    <form
      onSubmit={handleSubmit((formValues) => mutate({ formValues, tags }))}
      className="flex flex-col justify-center items-center w-full px-12 pb-6">
      <div className="flex gap-3 min-w-[292px] w-full mb-2">
        <label
          htmlFor="title"
          className="mt-2 font-bold text-brown-80 whitespace-nowrap">
          제목 :
        </label>
        <TextInput
          id="title"
          name="title"
          register={register}
          errors={errors}
          required
        />
      </div>
      <ImageUpload
        required={mode === 'add'}
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        setValue={setValue}
        imageUrl={post?.imageUrl}
        setIsImageUpdated={setIsImageUpdated}
      />
      <div className="flex gap-3 min-w-[292px] w-full mb-3">
        <label
          htmlFor="contents"
          className="mt-2 font-bold text-brown-80 whitespace-nowrap">
          내용 :
        </label>
        <TextArea
          id="contents"
          name="diaryContent"
          register={register}
          errors={errors}
          required
        />
      </div>
      <div className="flex gap-3 min-w-[292px] w-full mb-4">
        <label
          htmlFor="tag"
          className="mt-2 font-bold text-brown-80 whitespace-nowrap">
          태그 :
        </label>
        <TagInput
          id="tag"
          name="hashTag"
          register={register}
          resetField={resetField}
          tags={tags}
          setTags={setTags}
        />
      </div>
      <div className="flex gap-2">
        <CommonButton type="submit" size="sm">
          완료
        </CommonButton>
        <CommonButton onCancel={handleCancel} type="button" size="sm">
          취소
        </CommonButton>
      </div>
    </form>
  );
}
