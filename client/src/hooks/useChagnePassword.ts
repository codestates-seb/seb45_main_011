import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { updateUserPassword } from '@/api/profile';

import useUserStore from '@/stores/userStore';
import useModalStore from '@/stores/modalStore';

import { InputValues } from '@/types/common';

import { ALERT_TEXT } from '@/constants/contents';

const useChangePassword = (
  presentPassword: string,
  changedPassword: string,
) => {
  const { reset } = useForm<InputValues>();

  const { changeType, open } = useModalStore();
  const { setAccessToken } = useUserStore();

  const { mutate: changePassword } = useMutation({
    mutationFn: () => updateUserPassword(presentPassword, changedPassword),

    onSuccess: (data) => {
      setAccessToken(data.headers?.authorization);

      changeType('ChangePasswordModal');
      open();
    },
  });

  const updatePassword = async () => {
    if (!presentPassword && !changedPassword) return;

    if (presentPassword === changedPassword) {
      alert(ALERT_TEXT.password);
      return;
    }

    changePassword();
    reset();
  };

  return { updatePassword };
};

export default useChangePassword;
