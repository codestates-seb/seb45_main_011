import { useMutation } from '@tanstack/react-query';

import { deleteUser } from '@/api/history';

import useModalStore from '@/stores/modalStore';

const useDeleteUser = () => {
  const { close, changeType } = useModalStore();

  const { mutate: onDeleteUser } = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      return changeType('SuccessedModal');
    },
  });

  return { onDeleteUser, close };
};

export default useDeleteUser;
