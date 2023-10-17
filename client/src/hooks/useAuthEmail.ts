import { useMutation } from '@tanstack/react-query';

import { sendCodeByEmail } from '@/api/user';

import useSignStore from '@/stores/signStore';

const useAuthEmail = () => {
  const { setCode, isCode } = useSignStore();

  const { mutate: sendCodeWithEmail } = useMutation({
    mutationFn: (email: string) => sendCodeByEmail(email),
    onSuccess(data) {
      setCode(data.data.data.authCode);
    },
  });
  return { sendCodeWithEmail, isCode };
};

export default useAuthEmail;
