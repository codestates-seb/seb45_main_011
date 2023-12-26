import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addDiary, editDiary } from '@/api/leaf';

import { InputValues } from '@/types/common';

interface dataType {
  userId: string;
  leafId: string;
  diaryId?: string | null;
}

interface mutationParameters {
  inputs: InputValues;
  isImageUpdated: boolean;
}

const useDiaryFormMutaion = (mode: 'add' | 'edit', data: dataType) => {
  const { diaryId, userId, leafId } = data;

  const queryClient = useQueryClient();

  if (mode === 'add') {
    const { mutate } = useMutation({
      mutationFn: ({ inputs, isImageUpdated }: mutationParameters) =>
        addDiary({ leafId, inputs, isImageUpdated, userId }),

      onSuccess: () => {
        queryClient.invalidateQueries(['diaries', leafId]);
      },
    });
    return mutate;
  }
  if (mode === 'edit') {
    const { mutate } = useMutation({
      mutationFn: ({ inputs, isImageUpdated }: mutationParameters) =>
        editDiary({ diaryId, inputs, userId, isImageUpdated }),

      onSuccess: () => {
        queryClient.invalidateQueries(['diaries', leafId]);
      },
    });
    return mutate;
  }
};

export default useDiaryFormMutaion;
