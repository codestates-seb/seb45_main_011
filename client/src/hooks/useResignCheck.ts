import { useMutation } from '@tanstack/react-query';

import { postUserPassword } from '@/api/history';

import useModalStore from '@/stores/modalStore';
import useUserStore from '@/stores/userStore';

const useResignCheck = () => {
  const { setAccessToken } = useUserStore();
  const { changeType, close } = useModalStore();

  const { mutate: onPasswordCheck } = useMutation({
    mutationFn: (userPassword: string) => postUserPassword(userPassword),
    onSuccess: (data) => {
      if (!data.data.data) {
        return changeType('FailureModal');
      }

      changeType('ConfirmModal'), setAccessToken(data.headers?.authorization);
    },
  });

  return { onPasswordCheck, close };
};

export default useResignCheck;
