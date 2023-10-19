import { useMutation } from '@tanstack/react-query';

import { postUserPassword } from '@/api/history';

import useModalStore from '@/stores/modalStore';

const useResignCheckMutation = () => {
  const { changeType, close } = useModalStore();

  const { mutate } = useMutation({
    mutationFn: (userPassword: string) => postUserPassword(userPassword),
    onSuccess: (data) => {
      if (!data.data.data) {
        return changeType('FailureModal');
      }

      changeType('ConfirmModal');
    },
  });

  return { mutate, close };
};

export default useResignCheckMutation;
