import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { editPost } from '@/api/post';

import { InputValues } from '@/types/common';

interface EditPostParameters {
  formValues: InputValues;
  tags: string[];
  isImageUpdated: boolean;
  postId: string;
}

const useEditPost = (postId: string) => {
  const router = useRouter();

  const { mutate: editPostMutate } = useMutation({
    mutationFn: ({
      formValues,
      tags,
      isImageUpdated,
      postId,
    }: EditPostParameters) =>
      editPost(formValues, tags, isImageUpdated, postId),
    onSuccess: () => router.push(`/post/${postId}`),
  });

  return { editPostMutate };
};

export default useEditPost;
