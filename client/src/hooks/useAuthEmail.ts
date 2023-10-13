import { sendCodeByEmail } from '@/api/user';

import useSignStore from '@/stores/signStore';

const useAuthEmail = () => {
  const { setCode, isCode } = useSignStore();

  const sendCodeWithEmail = async (email: string) => {
    if (!email || isCode) return;

    try {
      const response = await sendCodeByEmail(email);

      setCode(response.data.data.authCode);
    } catch (error) {
      console.error(error);
    }
  };
  return { sendCodeWithEmail, isCode };
};

export default useAuthEmail;
