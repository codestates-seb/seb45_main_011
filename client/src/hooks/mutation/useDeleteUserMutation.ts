import { useMutation } from '@tanstack/react-query';

import { deleteUser } from '@/api/history';

import useModalStore from '@/stores/modalStore';

const useDeleteUserMutation = () => {
  const { close, changeType } = useModalStore();

  const { mutate } = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      return changeType('SuccessedModal');
    },
  });

  return { mutate, close };
};

export default useDeleteUserMutation;
