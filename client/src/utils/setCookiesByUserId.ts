import { setCookie } from 'cookies-next';

const setCookiesByUserId = (userId: string) => {
  const expiresDate = new Date(Number(new Date()) + 86400000);

  return setCookie('userId', userId, { expires: expiresDate });
};

export default setCookiesByUserId;
