'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useForm } from 'react-hook-form';

import useAddPost from '@/hooks/useAddPost';
import useEditPost from '@/hooks/useEditPost';
import useEffectOnce from '@/hooks/useEffectOnce';

import TextInput from '@/components/common/TextInput';
import ImageUpload from '@/components/common/ImageUpload';
import TextArea from '@/components/common/TextArea';
import TagInput from '@/components/common/TagInput';
import CommonButton from '@/components/common/CommonButton';

import { InputValues } from '@/types/common';
import { RawPostInfo } from '@/types/data';

interface PostFormProps {
  post?: RawPostInfo;
  postId?: string;
  mode: 'add' | 'edit';
}

export default function PostForm({ post, postId, mode }: PostFormProps) {
  const router = useRouter();

  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const { addPostMutate } = useAddPost();

  const { editPostMutate } = useEditPost(postId as string);

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    resetField,
    setValue,
  } = useForm<InputValues>();

  useEffectOnce(() => {
    if (post) {
      const tags = post.hashTags.map(({ tag }) => tag);

      setValue('title', post.title);
      setValue('diaryContent', post.content);
      setTags(tags);
    }
  });

  const handleMutate = (formValues: InputValues) => {
    mode === 'add' && addPostMutate({ formValues, tags });
    mode === 'edit' &&
      postId &&
      editPostMutate({ formValues, tags, isImageUpdated, postId });
  };

  const handleCancel = () => router.push('/board');

  return (
    <form
      onSubmit={handleSubmit(handleMutate)}
      className="flex flex-col justify-center items-center w-full px-12 pb-6">
      <div className="flex gap-3 min-w-[280px] w-full mb-2">
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
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        setValue={setValue}
        imageUrl={post?.boardImageUrl}
        setIsImageUpdated={setIsImageUpdated}
      />
      <div className="flex gap-3 min-w-[280px] w-full mb-3">
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
      <div className="flex gap-3 min-w-[280px] w-full mb-4">
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
        <CommonButton
          type="submit"
          size="sm"
          className="hover:scale-110 transition-transform">
          완료
        </CommonButton>
        <CommonButton
          onCancel={handleCancel}
          type="button"
          size="sm"
          className="hover:scale-110 transition-transform">
          취소
        </CommonButton>
      </div>
    </form>
  );
}
