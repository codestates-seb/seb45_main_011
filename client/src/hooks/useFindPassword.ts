import { useMutation, useQuery } from '@tanstack/react-query';

import { getUsersEmail, sendTemporaryPasswordByEmail } from '@/api/user';

import useModalStore from '@/stores/modalStore';

import { UserData } from '@/types/common';

const useFindPassword = () => {
  const { close, changeType } = useModalStore();

  const { data } = useQuery({
    queryKey: ['userEmail'],
    queryFn: () => getUsersEmail(),
  });

  const onEmailCheck = async (userEmail: string) => {
    if (!userEmail) return;

    const existEmail = data?.data.data.find(
      (current: UserData) => current.email === userEmail,
    );

    if (!existEmail) return changeType('FailureModal');

    mutate(userEmail);
  };

  const { mutate } = useMutation({
    mutationFn: (email: string) => sendTemporaryPasswordByEmail(email),

    onSuccess: (data) => {
      if (data.data.data.isSocial) {
        return changeType('MembershipCheckModal');
      }

      changeType('SuccessedModal');
    },
  });

  return { onEmailCheck, close };
};

export default useFindPassword;
