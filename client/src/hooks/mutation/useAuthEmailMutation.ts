import { useMutation } from '@tanstack/react-query';

import { sendCodeByEmail } from '@/api/user';

import useSignStore from '@/stores/signStore';
import useModalStore from '@/stores/modalStore';

const useAuthEmailMutation = () => {
  const { setCode, isCode } = useSignStore();
  const { changeType, open } = useModalStore();

  const { mutate } = useMutation({
    mutationFn: (email: string) => sendCodeByEmail(email),

    onSuccess: (data) => {
      if (data.data.data.isDuplicated) {
        open();
        return changeType('MembershipCheckModal');
      }

      setCode(data.data.data.authCode);
      open();
      changeType('AuthEmailModal');
    },
  });
  return { mutate, isCode };
};

export default useAuthEmailMutation;
