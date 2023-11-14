import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { addPost } from '@/api/post';

import { InputValues } from '@/types/common';

interface AddPostParameters {
  formValues: InputValues;
  tags: string[];
}

const useAddPost = () => {
  const router = useRouter();

  const { mutate: addPostMutate } = useMutation({
    mutationFn: ({ formValues, tags }: AddPostParameters) =>
      addPost(formValues, tags),
    onSuccess: () => router.push('/board'),
  });

  return { addPostMutate };
};

export default useAddPost;
