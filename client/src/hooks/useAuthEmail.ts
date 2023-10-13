import { useState } from 'react';

import { sendCodeByEmail } from '@/api/user';

import useSignStore from '@/stores/signStore';

const useAuthEmail = () => {
  const { setCode } = useSignStore();
  const [isCode, setIsCode] = useState(false);

  const sendCodeWithEmail = async (email: string) => {
    if (!email || isCode) return;

    try {
      const response = await sendCodeByEmail(email);

      open();

      setCode(response.data.data.authCode);
      setIsCode(true);
    } catch (error) {
      console.error(error);
    }
  };
  return { sendCodeWithEmail, isCode };
};

export default useAuthEmail;
