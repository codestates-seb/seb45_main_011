import { deleteCookie } from 'cookies-next';

const removeCookiesForUserId = () => {
  return deleteCookie('userId');
};

export default removeCookiesForUserId;
