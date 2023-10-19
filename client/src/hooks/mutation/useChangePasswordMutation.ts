import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { updateUserPassword } from '@/api/profile';

import useModalStore from '@/stores/modalStore';

import { InputValues } from '@/types/common';

import { ALERT_TEXT } from '@/constants/contents';

const useChangePasswordMutation = (
  presentPassword: string,
  changedPassword: string,
) => {
  const { reset } = useForm<InputValues>();

  const { changeType, open } = useModalStore();

  const { mutate } = useMutation({
    mutationFn: () => updateUserPassword(presentPassword, changedPassword),

    onSuccess: (data) => {
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

    mutate();
    reset();
  };

  return { updatePassword };
};

export default useChangePasswordMutation;
