import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { updateUserNickname } from '@/api/profile';

import useUserStore from '@/stores/userStore';
import useModalStore from '@/stores/modalStore';

import { InputValues } from '@/types/common';

const useChangeNicknameMutation = () => {
  const { reset } = useForm<InputValues>();

  const { setDisplayName, displayName } = useUserStore();
  const { changeType, open } = useModalStore();

  const { mutate } = useMutation({
    mutationFn: (nickname: string) => updateUserNickname(nickname),

    onSuccess: (data, nickname) => {
      setDisplayName(nickname);

      reset();

      changeType('ChangeNicknameModal');
      open();
    },
  });

  const updateNickName = async (nickname: string) => {
    if (!nickname) return;

    mutate(nickname);
  };

  return { updateNickName, displayName };
};

export default useChangeNicknameMutation;
