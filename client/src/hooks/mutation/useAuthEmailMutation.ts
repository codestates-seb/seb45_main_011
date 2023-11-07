import { useMutation } from '@tanstack/react-query';

import { sendCodeByEmail } from '@/api/user';

import useSignStore from '@/stores/signStore';

const useAuthEmailMutation = () => {
  const { setCode, isCode } = useSignStore();

  const { mutate } = useMutation({
    mutationFn: (email: string) => sendCodeByEmail(email),
    onSuccess(data) {
      setCode(data.data.data.authCode);
    },
  });
  return { mutate, isCode };
};

export default useAuthEmailMutation;
