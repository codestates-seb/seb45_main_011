import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { updateUserNickname } from '@/api/profile';

import useUserStore from '@/stores/userStore';
import useModalStore from '@/stores/modalStore';

import { InputValues } from '@/types/common';

const useChangeNickname = () => {
  const { reset } = useForm<InputValues>();

  const { setAccessToken, setDisplayName, displayName } = useUserStore();
  const { changeType, open } = useModalStore();

  const { mutate: onChangeNickname } = useMutation({
    mutationFn: (nickname: string) => updateUserNickname(nickname),

    onSuccess: (data, nickname) => {
      setDisplayName(nickname);
      setAccessToken(data.headers?.authorization);

      reset();

      changeType('ChangeNicknameModal');
      open();
    },
  });

  const updateNickName = async (nickname: string) => {
    if (!nickname) return;

    onChangeNickname(nickname);
  };

  return { updateNickName, displayName };
};

export default useChangeNickname;
